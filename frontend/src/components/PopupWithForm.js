import closeIcon from "../images/Clos-Icon.svg";

export default function PopupWithForm(props) {
  return (
    <>
      <section
        className={`popup popup_${props.name} ${
          props.isOpen && "popup_opened"
        }`}
      >
        <div className="popup__container">
          <button
            className="popup__close-icon"
            onClick={props.onClose}
            type="button"
          >
            <img className="popup__image-close" src={closeIcon} alt="Закрыть" />
          </button>
          <form
            className="popup__form popup__form_profile"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className="popup__button" type="submit">
              {props.buttonName}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
