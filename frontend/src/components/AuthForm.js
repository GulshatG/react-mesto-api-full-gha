import React from "react";
import "../blocks/auth/__form/auth__form.css";
import "../blocks/auth/__input/auth__input.css";
import "../blocks/auth/auth.css";
import "../blocks/auth/__title/auth__title.css";
import "../blocks/auth/__button/auth__button.css";
import "../blocks/auth/__second-link/auth__second-link.css";
import { Link } from "react-router-dom";

export default function AuthForm(props) {
  return (
    <div className={"auth"}>
      <form
        className="auth__form"
        // name={props.name}
        onSubmit={props.onSubmit}
      >
        <h2 className={"auth__title"}>{props.title}</h2>

        <input
          id="email"
          value={props.emailValue || ""}
          onChange={props.onChange}
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
        />
        {/*<span className="name-input-error popup__input-error"></span>*/}
        <input
          id="password"
          // value={description || ""}
          // onChange={handleDescriptionChange}
          value={props.passwordValue}
          onChange={props.onChange}
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          // minLength="2"
          // maxLength="200"
        />
        {/*<span className="feature-input-error popup__input-error"></span>*/}

        <button className="auth__button" type="submit">
          {props.buttonName}
        </button>
        {props.isSecondLink && (
          <Link to={"/sign-in"} className={"auth__second-link"}>
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </div>
  );
}
