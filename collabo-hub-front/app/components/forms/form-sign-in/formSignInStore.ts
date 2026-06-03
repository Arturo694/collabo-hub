import { makeAutoObservable } from "mobx";

class FormSignInStore {
    email: string = '';
    password: string = '';
    showPassword: boolean = false;
    validationErrors: string = '';
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setEmail(email: string) { this.email = email; }
    setPassword(password: string) { this.password = password; }
    setShowPassword(showPassword: boolean) { this.showPassword = showPassword; }
    setValidationErrors(error: string) { this.validationErrors = error; }
    setIsLoading(isLoading: boolean) { this.isLoading = isLoading; }

    reset() {
        this.email = '';
        this.password = '';
        this.showPassword = false;
        this.validationErrors = '';
        this.isLoading = false;
    }
}

export default FormSignInStore;
