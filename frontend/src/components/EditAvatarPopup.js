import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup(props) {
  const urlInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(urlInput.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      buttonName="Сохранить"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link"
        ref={urlInput}
        className="popup__input popup__input_field_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}
