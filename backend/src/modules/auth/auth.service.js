const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Roles = require('../../models/Role');
const LoginLog = require('../../models/LoginLog');
const RefreshToken = require('../../models/RefreshToken');

const ApiError = require('../../utils/ApiError');

const {
  signAccessToken,
  generateRefreshToken,
  hashToken
} = require('../../utils/tokenUtils');

const REFRESH_TOKEN_DAYS = Number(
  process.env.JWT_REFRESH_EXPIRES_DAYS || 7
);

/**
 * Supports:
 * 1. login({ userId, password, role }, null, meta)
 * 2. Legacy login(email, password, meta)
 */
async function login(credentials, legacyPassword, meta = {}) {
  const requestData =
    credentials &&
    typeof credentials === 'object' &&
    !Array.isArray(credentials)
      ? credentials
      : {
          email: credentials,
          password: legacyPassword
        };

  const userId = String(
    requestData.userId ||
    requestData.UserID ||
    requestData.email ||
    ''
  ).trim();

  const password = String(
    requestData.password || ''
  ).trim();

  const role = normalizeRole(
    requestData.role ||
    requestData.roleType ||
    ''
  );

  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  /*
  |--------------------------------------------------------------------------
  | Super Admin Login
  |--------------------------------------------------------------------------
  */

  if (role === 'SuperAdmin') {
    return loginSuperAdmin({
      userId,
      password
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Admin / Teacher Login from Roles collection
  |--------------------------------------------------------------------------
  */

  if (role === 'Admin' || role === 'Teacher') {
    return loginRoleUser({
      userId,
      password,
      role,
      meta
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Legacy User email login
  |--------------------------------------------------------------------------
  | This keeps your previous User-model authentication working.
  */

  return loginLegacyUser({
    email: userId,
    password,
    meta
  });
}

async function loginSuperAdmin({
  userId,
  password
}) {
  const configuredUserId = String(
    process.env.SUPER_ADMIN_USER_ID || ''
  ).trim();

  const configuredPassword = String(
    process.env.SUPER_ADMIN_PASSWORD || ''
  ).trim();

  if (!configuredUserId || !configuredPassword) {
    throw new ApiError(
      500,
      'Super Admin credentials are not configured in .env'
    );
  }

  if (
    userId !== configuredUserId ||
    password !== configuredPassword
  ) {
    throw new ApiError(
      401,
      'Invalid Super Admin User ID or Password'
    );
  }

  const accessToken = createRoleAccessToken({
    userId,
    role: 'SuperAdmin'
  });

  return {
    accessToken,
    token: accessToken,
    refreshToken: null,

    id: null,
    userId,
    role: 'SuperAdmin',

    user: {
      id: null,
      name: 'Super Admin',
      email: null,
      userId,
      role: 'SuperAdmin',
      userType: 'SuperAdmin'
    }
  };
}

async function loginRoleUser({
  userId,
  password,
  role,
  meta
}) {
  const roleUser = await Roles.findOne({
    UserID: {
      $regex: `^${escapeRegex(userId)}$`,
      $options: 'i'
    }
  });

  /*
  |--------------------------------------------------------------------------
  | User ID not found
  |--------------------------------------------------------------------------
  */

  if (!roleUser) {
    await saveLoginLog({
      UserID: userId,
      roleType: role,
      action: 'Login',
      status: 'Failed',
      reason: 'User ID not found',
      meta
    });

    throw new ApiError(
      401,
      `Invalid ${role} User ID or Password`
    );
  }

  const databaseRole = String(
    roleUser.roleType || ''
  ).trim();

  const databasePassword = String(
    roleUser.Password || ''
  ).trim();

  /*
  |--------------------------------------------------------------------------
  | Wrong panel selected
  |--------------------------------------------------------------------------
  */

  if (databaseRole !== role) {
    await saveLoginLog({
      UserID: roleUser.UserID,
      roleType: role,
      action: 'Login',
      status: 'Failed',
      reason: `User belongs to ${databaseRole} role`,
      meta
    });

    throw new ApiError(
      401,
      `This User ID belongs to ${databaseRole} Panel`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Wrong password
  |--------------------------------------------------------------------------
  */

  if (databasePassword !== password) {
    await saveLoginLog({
      UserID: roleUser.UserID,
      roleType: roleUser.roleType,
      action: 'Login',
      status: 'Failed',
      reason: 'Invalid password',
      meta
    });

    throw new ApiError(
      401,
      `Invalid ${role} User ID or Password`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Successful login
  |--------------------------------------------------------------------------
  */

  await saveLoginLog({
    UserID: roleUser.UserID,
    roleType: roleUser.roleType,
    action: 'Login',
    status: 'Success',
    reason: '',
    meta
  });

  const accessToken = createRoleAccessToken({
    id: roleUser._id,
    userId: roleUser.UserID,
    role: roleUser.roleType
  });

  return {
    accessToken,
    token: accessToken,
    refreshToken: null,

    id: roleUser._id,
    userId: roleUser.UserID,
    role: roleUser.roleType,

    user: {
      id: roleUser._id,
      name: roleUser.UserID,
      email: null,
      userId: roleUser.UserID,
      role: roleUser.roleType,
      userType: roleUser.roleType
    }
  };
}

async function loginLegacyUser({
  email,
  password,
  meta
}) {
  const normalizedEmail = String(
    email || ''
  )
    .trim()
    .toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  })
    .select('+passwordHash')
    .populate('role');

  if (!user) {
    throw new ApiError(
      401,
      'Invalid email or password'
    );
  }

  if (
    typeof user.isLocked === 'function' &&
    user.isLocked()
  ) {
    throw new ApiError(
      423,
      'Account temporarily locked due to repeated failed attempts'
    );
  }

  const valid = await user.comparePassword(
    password
  );

  if (!valid) {
    user.failedLoginAttempts =
      Number(user.failedLoginAttempts || 0) + 1;

    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(
        Date.now() + 15 * 60 * 1000
      );
    }

    await user.save();

    throw new ApiError(
      401,
      'Invalid email or password'
    );
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLoginAt = new Date();

  await user.save();

  const accessToken = signAccessToken(user);

  const {
    raw,
    hash
  } = generateRefreshToken();

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hash,
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,

    expiresAt: new Date(
      Date.now() +
      REFRESH_TOKEN_DAYS *
      24 *
      60 *
      60 *
      1000
    )
  });

  return {
    accessToken,
    token: accessToken,
    refreshToken: raw,

    id: user._id,
    userId: user.email,
    role: user.userType,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      userId: user.email,
      role: user.userType,
      userType: user.userType,
      schoolId: user.schoolId
    }
  };
}

async function refresh(rawToken) {
  if (!rawToken) {
    throw new ApiError(
      400,
      'Refresh token is required'
    );
  }

  const hash = hashToken(rawToken);

  const stored = await RefreshToken.findOne({
    tokenHash: hash
  });

  if (
    !stored ||
    stored.revokedAt ||
    stored.expiresAt < new Date()
  ) {
    throw new ApiError(
      401,
      'Invalid or expired refresh token'
    );
  }

  const user = await User.findById(
    stored.userId
  ).populate('role');

  if (!user || user.status !== 'active') {
    throw new ApiError(
      401,
      'User inactive'
    );
  }

  const {
    raw,
    hash: newHash
  } = generateRefreshToken();

  stored.revokedAt = new Date();
  stored.replacedByTokenHash = newHash;

  await stored.save();

  await RefreshToken.create({
    userId: user._id,
    tokenHash: newHash,

    expiresAt: new Date(
      Date.now() +
      REFRESH_TOKEN_DAYS *
      24 *
      60 *
      60 *
      1000
    )
  });

  return {
    accessToken: signAccessToken(user),
    refreshToken: raw
  };
}

/**
 * Supports:
 *
 * logout(refreshToken)
 *
 * or:
 *
 * logout({
 *   refreshToken,
 *   userId,
 *   role
 * })
 */
async function logout(logoutData, meta = {}) {
  const data =
    logoutData &&
    typeof logoutData === 'object'
      ? logoutData
      : {
          refreshToken: logoutData
        };

  const rawToken = String(
    data.refreshToken || ''
  ).trim();

  const userId = String(
    data.userId ||
    data.UserID ||
    ''
  ).trim();

  const role = normalizeRole(
    data.role ||
    data.roleType ||
    ''
  );

  /*
  |--------------------------------------------------------------------------
  | Revoke refresh token when available
  |--------------------------------------------------------------------------
  */

  if (rawToken) {
    const hash = hashToken(rawToken);

    await RefreshToken.updateOne(
      {
        tokenHash: hash,
        revokedAt: null
      },
      {
        revokedAt: new Date()
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Record Admin / Teacher logout
  |--------------------------------------------------------------------------
  */

  if (
    userId &&
    ['Admin', 'Teacher'].includes(role)
  ) {
    await saveLoginLog({
      UserID: userId,
      roleType: role,
      action: 'Logout',
      status: 'Success',
      reason: '',
      meta
    });
  }

  return {
    userId: userId || null,
    role: role || null
  };
}

async function saveLoginLog({
  UserID,
  roleType,
  action,
  status,
  reason,
  meta = {}
}) {
  try {
    await LoginLog.create({
      UserID,
      roleType,
      action,
      status,
      reason: reason || '',
      loginTime: new Date(),

      ipAddress:
        meta.ipAddress || undefined,

      userAgent:
        meta.userAgent || undefined
    });
  } catch (error) {
    /*
     * Login should not fail only because logging failed.
     */
    console.error(
      'Login log save error:',
      error.message
    );
  }
}

function createRoleAccessToken(payload) {
  const secret =
    process.env.JWT_ACCESS_SECRET ||
    process.env.JWT_SECRET;

  if (!secret) {
    throw new ApiError(
      500,
      'JWT secret is not configured'
    );
  }

  const expiresIn =
    process.env.JWT_ACCESS_EXPIRES ||
    '15m';

  return jwt.sign(
    {
      id: payload.id || null,
      userId: payload.userId,
      role: payload.role,
      userType: payload.role
    },
    secret,
    {
      expiresIn
    }
  );
}

function normalizeRole(value) {
  const normalized = String(
    value || ''
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');

  if (
    normalized === 'superadmin' ||
    normalized === 'superadminpanel'
  ) {
    return 'SuperAdmin';
  }

  if (
    normalized === 'admin' ||
    normalized === 'adminpanel'
  ) {
    return 'Admin';
  }

  if (
    normalized === 'teacher' ||
    normalized === 'teacherpanel'
  ) {
    return 'Teacher';
  }

  return '';
}

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}

module.exports = {
  login,
  refresh,
  logout
};