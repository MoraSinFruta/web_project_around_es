// Importación correcta de funciones desde el módulo de validación
import { enableValidation, setEventListeners, resetValidation } from "./validate.js";

// --- SELECCIÓN DE ELEMENTOS DEL DOM ---

// Elementos del perfil y formulario de edición
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const profileCloseButton = editPopup.querySelector(".popup__close");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileForm = document.querySelector('#edit-profile-form');

// Elementos del modal "Agregar una tarjeta"
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const cardCloseButton = newCardPopup.querySelector(".popup__close");
const cardForm = document.querySelector("#new-card-form");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const placeLinkInput = document.querySelector(".popup__input_type_url");

// Elementos del modal de apertura de Imagen
const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupPicture = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

// Contenedores de la galería
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

// Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// --- FUNCIONES PARA GENERAR Y RENDERIZAR TARJETAS ---

function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteClick(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

function handleImagePreviewClick(name, link) {
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

function getCardElement({ name = "Sin título", link = "./images/placeholder.jpg" } = {}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener('click', handleLikeClick);
  deleteButton.addEventListener('click', handleDeleteClick);
  
  cardImage.addEventListener('click', () => {
    handleImagePreviewClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

// Renderizar recorriendo el array de atrás hacia adelante para preservar el orden original con prepend
initialCards.toReversed().forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// --- FUNCIONES REUTILIZABLES DE MODALES ---

// El detector de teclado para cerrar con Esc se añade al abrir y se remueve al cerrar
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm(); 
  
  // Reseteamos y limpiamos validaciones del formulario de edición al abrirlo
  resetValidation(profileForm);
  
  openModal(editPopup);
}

function handleOpenAddCardModal() {
  cardForm.reset();

  // Reseteamos y limpiamos validaciones del formulario de agregar tarjetas al abrirlo
  resetValidation(cardForm);

  openModal(newCardPopup);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// CONTROLADORES DE ENVÍO DE FORMULARIOS

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newName = placeNameInput.value;
  const newLink = placeLinkInput.value;

  renderCard(newName, newLink, cardsContainer);
  cardForm.reset();
  closeModal(newCardPopup);
}

// Inicialización de la validación global
enableValidation();

// --- EVENT LISTENERS ---

// Eventos para el perfil modal
editButton.addEventListener('click', handleOpenEditModal);
profileCloseButton.addEventListener('click', () => closeModal(editPopup));
profileForm.addEventListener('submit', handleProfileFormSubmit);
editPopup.addEventListener('click', handleOverlayClick);

// Eventos para el modal de agregar tarjetas
addButton.addEventListener('click', handleOpenAddCardModal);
cardCloseButton.addEventListener('click', () => closeModal(newCardPopup));
cardForm.addEventListener('submit', handleCardFormSubmit);
newCardPopup.addEventListener('click', handleOverlayClick);

// Eventos para el modal de la imagen grande
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));
imagePopup.addEventListener('click', handleOverlayClick);