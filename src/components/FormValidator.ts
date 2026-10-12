import { FormConfig } from "../utils/constants.js";

export class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector),
    ) as HTMLInputElement[];
    this.buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector,
    ) as HTMLButtonElement;
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    inputElement.classList.add(this.config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    inputElement.classList.remove(this.config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this.toggleButtonState();
  }

  public enableValidation(): void {
    this.setEventListeners();
  }
}