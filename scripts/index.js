
console.log("¡El script index.js se ha conectado correctamente!");


const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const editPopup = document.querySelector("#edit-popup");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');


const profileForm = document.querySelector('#edit-profile-form');


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


initialCards.forEach((card) => {
  console.log(card.name);
});


function openModal(modal) {
  modal.classList.add('popup_is-opened');
}


function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}


function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}


function handleOpenEditModal() {
  fillProfileForm(); 
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {

  evt.preventDefault();

 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  
  closeModal(editPopup);
}


editButton.addEventListener('click', handleOpenEditModal);


closeButton.addEventListener('click', () => {
  closeModal(editPopup);
});


profileForm.addEventListener('submit', handleProfileFormSubmit);