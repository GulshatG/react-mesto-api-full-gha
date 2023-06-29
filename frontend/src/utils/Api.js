export default class Api {
  constructor({ url, auth }) {
    this._url = url;
    this._auth = auth;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Something went wrong: ");
  }
}
