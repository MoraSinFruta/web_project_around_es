import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
    }
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
