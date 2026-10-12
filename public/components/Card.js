export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.handleLikeClick = (likeButton) => {
            likeButton.classList.toggle("card__like-button_is-active");
        };
        this.handleDeleteClick = () => {
            this.element.remove();
        };
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        return cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
    }
    setEventListeners() {
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        const cardImage = this.element.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            this.handleLikeClick(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteClick();
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.name, this.link);
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        cardImage.src = this.link;
        cardImage.alt = this.name;
        cardTitle.textContent = this.name;
        this.setEventListeners();
        return this.element;
    }
}
