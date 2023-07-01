const jwt = require('jsonwebtoken');
const Unauthorized = require('../exceptions/unauthorized');
const { unauthorized } = require('../utils/validationMessage');

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return next(new Unauthorized(unauthorized));
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('err while try verify token')
    return next(new Unauthorized(unauthorized));
  }
  req.user = payload;
  return next();
};
