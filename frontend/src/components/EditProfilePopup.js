import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      buttonName="Сохранить"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        value={name || ''}
        onChange={handleNameChange}
        className="popup__input popup__input_field_name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="feature-input"
        value={description || ''}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_field_feature"
        type="text"
        name="feature"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="feature-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}
