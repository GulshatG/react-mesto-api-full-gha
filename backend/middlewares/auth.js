const jwt = require('jsonwebtoken');
const Unauthorized = require('../exceptions/unauthorized');
const { unauthorized } = require('../utils/validationMessage');

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Unauthorized(unauthorized));
  }
  let payload;
  try {
    const key = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new Unauthorized(unauthorized));
  }
  req.user = payload;
  return next();
};
