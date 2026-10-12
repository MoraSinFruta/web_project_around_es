import {
  initialCards,
  defaultFormConfig,
  CARD_TEMPLATE_SELECTOR,
  CARDS_CONTAINER_SELECTOR,
  POPUP_PROFILE_SELECTOR,
  POPUP_ADD_CARD_SELECTOR,
  POPUP_IMAGE_SELECTOR,
  USER_INFO_SELECTORS,
  CardData,
} from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";

// 1. Popup de vista previa de imagen
const imagePopup = new PopupWithImage(POPUP_IMAGE_SELECTOR);
imagePopup.setEventListeners();

// Creador universal de cartas (acoplamiento débil)
const createCard = (cardData: CardData): HTMLElement => {
  const card = new Card(
    cardData,
    CARD_TEMPLATE_SELECTOR,
    (name: string, link: string) => {
      imagePopup.open(name, link);
    },
  );
  return card.generateCard();
};

// 2. Sección para renderizar la lista de tarjetas
// Se invierte una copia del array para que, al insertar con prepend, queden en orden 1 a 6
const cardsSection = new Section<CardData>(
  {
    items: [...initialCards].reverse(),
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardsSection.addItem(cardElement);
    },
  },
  CARDS_CONTAINER_SELECTOR,
);

cardsSection.renderItems();

// 3. UserInfo
const userInfo = new UserInfo(USER_INFO_SELECTORS);

// 4. Popup de Edición de Perfil
const profilePopup = new PopupWithForm(
  POPUP_PROFILE_SELECTOR,
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
  },
);
profilePopup.setEventListeners();

// 5. Popup de Agregar Tarjeta
const addCardPopup = new PopupWithForm(
  POPUP_ADD_CARD_SELECTOR,
  (formData) => {
    const newCardElement = createCard({
      name: formData["place-name"],
      link: formData.link,
    });
    cardsSection.addItem(newCardElement);
  },
);
addCardPopup.setEventListeners();

// 6. Validadores para cada formulario
const formValidators: Record<string, FormValidator> = {};

const enableValidation = () => {
  const formElements = Array.from(
    document.querySelectorAll<HTMLFormElement>(".popup__form"),
  );

  formElements.forEach((formElement) => {
    const validator = new FormValidator(defaultFormConfig, formElement);
    const formId = formElement.id;
    if (formId) {
      formValidators[formId] = validator;
    }
    validator.enableValidation();
  });
};

enableValidation();

// 7. Botones de apertura de modales y precarga
const profileEditButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const cardAddButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;

const nameInput = document.querySelector(
  "#profile-name-input",
) as HTMLInputElement;
const descriptionInput = document.querySelector(
  "#profile-description-input",
) as HTMLInputElement;

profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  descriptionInput.value = currentUser.job;
  formValidators["edit-profile-form"]?.resetValidation();
  profilePopup.open();
});

cardAddButton.addEventListener("click", () => {
  formValidators["new-card-form"]?.resetValidation();
  addCardPopup.open();
});