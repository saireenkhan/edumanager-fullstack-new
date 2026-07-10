const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const ApiError = require('../../utils/ApiError');
const { signAccessToken, generateRefreshToken, hashToken } = require('../../utils/tokenUtils');

const REFRESH_TOKEN_DAYS = Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 7);

async function login(email, password, meta = {}) {
  const user = await User.findOne({ email }).select('+passwordHash').populate('role');
  if (!user) throw new ApiError(401, 'Invalid email or password');

  if (user.isLocked()) {
    throw new ApiError(423, 'Account temporarily locked due to repeated failed attempts');
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
    }
    await user.save();
    throw new ApiError(401, 'Invalid email or password');
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = signAccessToken(user);
  const { raw, hash } = generateRefreshToken();

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hash,
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken: raw,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      schoolId: user.schoolId,
    },
  };
}

async function refresh(rawToken) {
  const hash = hashToken(rawToken);
  const stored = await RefreshToken.findOne({ tokenHash: hash });

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(stored.userId).populate('role');
  if (!user || user.status !== 'active') throw new ApiError(401, 'User inactive');

  // rotate: revoke old, issue new
  const { raw, hash: newHash } = generateRefreshToken();
  stored.revokedAt = new Date();
  stored.replacedByTokenHash = newHash;
  await stored.save();

  await RefreshToken.create({
    userId: user._id,
    tokenHash: newHash,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000),
  });

  return { accessToken: signAccessToken(user), refreshToken: raw };
}

async function logout(rawToken) {
  const hash = hashToken(rawToken);
  await RefreshToken.updateOne({ tokenHash: hash }, { revokedAt: new Date() });
}

module.exports = { login, refresh, logout };
