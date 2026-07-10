const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(payload.userId).populate('role');
    if (!user || user.status !== 'active') {
      throw new ApiError(401, 'Invalid or inactive user');
    }

    req.user = user; // available to every downstream middleware/controller
    next();
  } catch (err) {
    next(new ApiError(401, 'Unauthorized: ' + err.message));
  }
}

module.exports = authenticate;
