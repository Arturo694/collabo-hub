import { makeAutoObservable } from "mobx";

class FormSignUpStore {

    userName: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    atSign: string = '';
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    validationErrors: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUserName(userName: string) { this.userName = userName; }
    setEmail(email: string) { this.email = email; }
    setPassword(password: string) { this.password = password; }
    setConfirmPassword(confirmPassword: string) { this.confirmPassword = confirmPassword; }
    setAtSign(atSign: string) { this.atSign = atSign; }
    setShowPassword(showPassword: boolean) { this.showPassword = showPassword; }
    setShowConfirmPassword(showConfirmPassword: boolean) { this.showConfirmPassword = showConfirmPassword; }
    setValidationErrors(errors: string[]) { this.validationErrors = errors; }

    reset() {
        this.userName = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.atSign = '';
        this.showPassword = false;
        this.showConfirmPassword = false;
        this.validationErrors = [];
    }
}

export default FormSignUpStore
