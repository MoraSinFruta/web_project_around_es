export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor({
    nameSelector,
    jobSelector,
  }: {
    nameSelector: string;
    jobSelector: string;
  }) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.jobElement = document.querySelector(jobSelector) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent?.trim() || "",
      job: this.jobElement.textContent?.trim() || "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}