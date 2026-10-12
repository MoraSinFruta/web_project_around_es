export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        this.popupElement = document.querySelector(popupSelector);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        this.popupElement.addEventListener("click", (evt) => {
            const target = evt.target;
            if (target.classList.contains("popup_is-opened") ||
                target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
