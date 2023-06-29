import closeIcon from "../images/Clos-Icon.svg";
import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";
import "../blocks/popup/__info/popup__info.css";
import "../blocks/popup/__info-group/popup__info-group.css";
import "../blocks/popup/__info-icon/popup__info-icon.css";
import "../blocks/popup/__info-text/popup__info-text.css";

export default function InfoPopup(props) {
  return (
    <section className={`popup popup__info ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          onClick={props.onClose}
          type="button"
        >
          <img className="popup__image-close" src={closeIcon} alt="Закрыть" />
        </button>
        <div className={"popup__info-group"}>
          <img
            className={"popup__info-icon"}
            src={props.isSuccess ? successIcon : failIcon}
            alt={props.isSuccess ? "Успешно" : "Ошибка"}
          />
          <p className={"popup__info-text"}>{props.message}</p>
        </div>
      </div>
    </section>
  );
}
