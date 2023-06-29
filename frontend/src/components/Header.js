import logo from "../images/logo.svg";
import "../blocks/header/__links/header__links.css";
import "../blocks/header/__link/header__link.css";
import "../blocks/header/__link/_grey/header__link_grey.css";
import "../blocks/header/__links-group/header__links-group.css";
import "../blocks/header/__link-name/header__link-name.css";
import { Link } from "react-router-dom";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <header className="header">
        <div className={"header__links"}>
          <img className="header__logo" src={logo} alt="Логотип" />
          <div className={"header__links-group"}>
            {props.email && (
              <p className={"header__link-name"}>{props.email}</p>
            )}

            <Link
              to={props.link}
              className={
                "header__link" + (currentUser.name ? " header__link_grey" : "")
              }
            >
              {props.linkName}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
