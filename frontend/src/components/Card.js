import trash from "../images/Trash.svg";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked && "elements__button-like_active"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="elements__element">
      {isOwn && (
        <img
          className="elements__trash-icon"
          onClick={handleDeleteClick}
          src={trash}
          alt="Удалить"
        />
      )}
      <img
        className="elements__picture"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="elements__group">
        <h3 className="elements__name">{props.card.name}</h3>
        <div className="elements__like-group">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
