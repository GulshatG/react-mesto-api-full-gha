const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404)
      .send({ message: err.message });
  } else if (err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError) {
    res.status(400)
      .send({ message: err.message });
  } else {
    res.status(err.statusCode || 500)
      .send({ message: err.message });
  }
};
