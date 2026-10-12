export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupElement = document.querySelector(popupSelector) as HTMLElement;
  }

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public setEventListeners(): void {
    this.popupElement.addEventListener("click", (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (
        target.classList.contains("popup_is-opened") ||
        target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}