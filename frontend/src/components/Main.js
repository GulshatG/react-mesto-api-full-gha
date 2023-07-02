import editButton from "../images/Edit-Button.svg";
import addButton from "../images/Add-Button.svg";
import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../context/CurrentUserContext";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        props.onHeaderLinkChange("Выход", "/logout");
        return () => props.onHeaderLinkChange("", "");
    });

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__person">
                    <div className="profile__avatar-group">
                        <img
                            className="profile__avatar"
                            src={`${currentUser.avatar}`}
                            alt="Жак-Ив Кусто"
                        />
                        <button
                            className="profile__avatar-edit"
                            onClick={props.onEditAvatar}
                        ></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__feature">{currentUser.about}</p>
                        </div>
                        <button
                            className="profile__button-edit"
                            onClick={props.onEditProfile}
                            type="button"
                        >
                            <img
                                className="profile__icon-edit"
                                src={editButton}
                                alt="Кнопка редактирования"
                            />
                        </button>
                    </div>
                </div>
                <button
                    className="profile__button-add"
                    onClick={props.onAddPlace}
                    type="button"
                >
                    <img className="profile__button-icon" src={addButton} alt="Кнопка"/>
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                })}
            </section>
        </main>
    );
}
