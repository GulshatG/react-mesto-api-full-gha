import closeIcon from "../images/Clos-Icon.svg";

export default function ImagePopup(props) {
  return (
    <>
      <section
        className={`popup popup_card ${
          Object.keys(props.card).length !== 0 && "popup_opened"
        }`}
      >
        <div className="popup__big-img-container">
          <button
            className="popup__close-icon popup__close-icon_popup-card"
            type="button"
            onClick={props.onClose}
          >
            <img className="popup__image-close" src={closeIcon} alt="Закрыть" />
          </button>
          <img
            className="popup__big-image"
            src={props.card.link}
            alt={props.card.name}
          />
          <h3 className="popup__big-img-title">{props.card.name}</h3>
        </div>
      </section>
    </>
  );
}
