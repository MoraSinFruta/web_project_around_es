import { Popup } from "./Popup.js";

export type FormSubmitHandler = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private handleFormSubmit: FormSubmitHandler;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    ) as HTMLInputElement[];
  }

  private getInputValues(): Record<string, string> {
    const formValues: Record<string, string> = {};
    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
      this.close();
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}