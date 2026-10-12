export class UserInfo {
    constructor({ nameSelector, jobSelector, }) {
        this.nameElement = document.querySelector(nameSelector);
        this.jobElement = document.querySelector(jobSelector);
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: ((_a = this.nameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "",
            job: ((_b = this.jobElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "",
        };
    }
    setUserInfo({ name, job }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
    }
}
