const {
  celebrate,
  Joi,
} = require('celebrate');
const { regexUrl } = require('../utils/regex');

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .regex(regexUrl),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});
module.exports.celebrateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
});
module.exports.celebrateUpdateUserAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .regex(regexUrl),
    }),
});
module.exports.celebrateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});
module.exports.celebrateUserById = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
});
