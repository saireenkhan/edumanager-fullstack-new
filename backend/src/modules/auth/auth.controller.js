const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const REFRESH_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 7) * 24 * 60 * 60 * 1000,
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password, {
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  });

  res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTS);
  res.json({ success: true, accessToken: result.accessToken, user: result.user });
});

const refresh = asyncHandler(async (req, res) => {
  const rawToken = req.cookies.refreshToken;
  const result = await authService.refresh(rawToken);

  res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTS);
  res.json({ success: true, accessToken: result.accessToken });
});

const logout = asyncHandler(async (req, res) => {
  const rawToken = req.cookies.refreshToken;
  if (rawToken) await authService.logout(rawToken);
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out' });
});

module.exports = { login, refresh, logout };
