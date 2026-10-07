const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const REFRESH_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge:
    Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 7) *
    24 *
    60 *
    60 *
    1000
};

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(
    req.body,
    null,
    {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    }
  );

  if (result.refreshToken) {
    res.cookie(
      'refreshToken',
      result.refreshToken,
      REFRESH_COOKIE_OPTS
    );
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
    accessToken: result.accessToken,
    user: result.user
  });
});

const refresh = asyncHandler(async (req, res) => {
  const rawToken =
    req.cookies?.refreshToken ||
    req.body?.refreshToken;

  const result = await authService.refresh(
    rawToken
  );

  res.cookie(
    'refreshToken',
    result.refreshToken,
    REFRESH_COOKIE_OPTS
  );

  return res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: result,
    accessToken: result.accessToken
  });
});

const logout = asyncHandler(async (req, res) => {
  const rawToken =
    req.cookies?.refreshToken ||
    req.body?.refreshToken;

  const logoutData = {
    ...req.body,
    refreshToken: rawToken
  };

  const result = await authService.logout(
    logoutData,
    {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip
    }
  );

  res.clearCookie(
    'refreshToken',
    REFRESH_COOKIE_OPTS
  );

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: result
  });
});

module.exports = {
  login,
  refresh,
  logout
};