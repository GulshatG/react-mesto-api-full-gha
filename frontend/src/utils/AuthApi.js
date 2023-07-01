import Api from "./Api";

class AuthApi extends Api {
  constructor({ url, auth }) {
    super({ url, auth });
  }

  signUp({ email, password }) {
    return fetch(this._url + "/signup", {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  signIn({ email, password }) {
    return fetch(this._url + "/signin", {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(this._url + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include"
    }).then(this._checkResponse);
  }
}

export default new AuthApi({
  url: 'https://api.gulshat-express.nomoreparties.sbs',
  auth: "83b38506-64f5-462f-9bf3-410e2163a0f8",
});
