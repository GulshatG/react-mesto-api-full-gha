const mongoose = require('mongoose');
const validator = require('validator');
const { regexUrl } = require('../utils/regex');
const { emailFormat } = require('../utils/validationMessage');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Wrong url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: emailFormat,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });
module.exports = mongoose.model('user', userSchema);
