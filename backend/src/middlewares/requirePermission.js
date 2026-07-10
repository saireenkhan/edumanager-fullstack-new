const ApiError = require('../utils/ApiError');

function requirePermission(permissionKey) {
  return (req, res, next) => {
    if (req.user.userType === 'super_admin') return next(); // bypass

    const keys = (req.user.role?.permissions || []).map((p) => p.key || p);
    if (!keys.includes(permissionKey)) {
      return next(new ApiError(403, `Missing permission: ${permissionKey}`));
    }
    next();
  };
}

module.exports = requirePermission;
