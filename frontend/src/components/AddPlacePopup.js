import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({ name, link});
  }
  return (
    <PopupWithForm
      name="create-card"
      buttonName="Сохранить"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_field_title"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="link-input"
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_field_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}
