import { CardData } from "../utils/constants.js";

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: (name: string, link: string) => void;
  private element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
  ) {
    this.name = data.name;
    this.link = data.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.templateSelector,
    ) as HTMLTemplateElement;
    return cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private handleLikeClick = (likeButton: HTMLElement): void => {
    likeButton.classList.toggle("card__like-button_is-active");
  };

  private handleDeleteClick = (): void => {
    this.element.remove();
  };

  private setEventListeners(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLElement;
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

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

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    const cardTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;

    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardTitle.textContent = this.name;

    this.setEventListeners();

    return this.element;
  }
}