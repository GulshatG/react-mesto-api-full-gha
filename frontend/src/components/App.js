import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import UserApi from "../utils/UserApi";
import { CurrentUserContext } from "../context/CurrentUserContext";
import CardApi from "../utils/CardApi";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoPopup from "./InfoTooltip";
import AuthApi from "../utils/AuthApi";
import Logout from "./Logout";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [headerLinkName, setHeaderLinkName] = React.useState("");
  const [headerLink, setHeaderLink] = React.useState("");
  const [infoMessage, setInfoMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([CardApi.getCards(), UserApi.getUserInfo()])
        .then(([cardsRes, userRes]) => {
          setCards([...cardsRes]);
          setCurrentUser(userRes);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthApi.checkToken(token)
        .then((res) => {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch(() => console.log("Token doesn't exist or wrong"));
    }
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleRegisterSubmit(email, password) {
    AuthApi.signUp({ email, password })
      .then(() => {
        navigate("/sign-in");
        setIsInfoPopupOpen(true);
        setIsSuccessRegistration(true);
        setInfoMessage("Вы успешно зарегистрировались!");
      })
      .catch(() => {
        setIsInfoPopupOpen(true);
        setIsSuccessRegistration(false);
        setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleLoginSubmit(email, password) {
    AuthApi.signIn({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setCurrentUserEmail(email);
        navigate("/");
      })
      .catch(() => {
        setIsInfoPopupOpen(true);
        setInfoMessage("Неправильный логин или пароль! Попробуйте ещё раз.");
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    CardApi.like(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    CardApi.deleteCard(card._id)
      .then(() => {
        setCards([...cards.filter((c) => c._id !== card._id)]);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    UserApi.updateInfo(name, about)
      .then((u) => {
        setCurrentUser(u);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    UserApi.updateAvatar(link)
      .then((u) => {
        setCurrentUser(u);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard(card) {
    CardApi.addCard(card)
      .then((c) => {
        setCards([c, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleHeaderLinkChange(name, link) {
    setHeaderLinkName(name);
    setHeaderLink(link);
  }

  function deleteEmail() {
    setCurrentUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          linkName={headerLinkName}
          link={headerLink}
          email={currentUserEmail}
        />
        <Routes>
          <Route
            path={"/sign-in"}
            element={
              <Login
                onHeaderLinkChange={handleHeaderLinkChange}
                onSubmit={handleLoginSubmit}
              />
            }
          />
          <Route
            path={"/sign-up"}
            element={
              <Register
                onHeaderLinkChange={handleHeaderLinkChange}
                onSubmit={handleRegisterSubmit}
              />
            }
          />
          <Route
            path={"/logout"}
            element={
              <ProtectedRoute
                element={Logout}
                loggedIn={loggedIn}
                onHeaderLinkChange={handleHeaderLinkChange}
                deleteEmail={deleteEmail}
              />
            }
          />
          <Route
            path={"/"}
            element={
              <>
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onHeaderLinkChange={handleHeaderLinkChange}
                  cards={cards}
                />
                <Footer />
              </>
            }
          />
          <Route path={"*"} element={<Navigate to={"/sign-in"} />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete"
          buttonName="Да"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          message={infoMessage}
          isSuccess={isSuccessRegistration}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
