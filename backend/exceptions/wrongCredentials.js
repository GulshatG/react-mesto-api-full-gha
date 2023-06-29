class WrongCredentials extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = WrongCredentials;
