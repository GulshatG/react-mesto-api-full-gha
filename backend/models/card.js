const mongoose = require('mongoose');
const ValidationMessage = require('../utils/validationMessage');
const { regexUrl } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Wrong url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }, ValidationMessage.type],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });
module.exports = mongoose.model('card', cardSchema);
