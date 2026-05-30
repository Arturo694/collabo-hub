import { makeAutoObservable } from "mobx";
import * as z from "zod";


const SignupSchema = z.object({
    userName:
        z.string()
            .min(3, "Username must be at least 3 characters long")
            .max(20, "Username must be at most 20 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email:
        z.email("Invalid email address"),
    password:
        z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[a-zA-Z]/, "Password must contain at least one letter")
            .regex(/\d/, "Password must contain at least one number"),
    confirmPassword:
        z.string(),
    atSign:
        z.string()
            .startsWith("@", "At sign must start with @")
            .min(5, "At sign must be at least 5 characters long")
            .max(20, "At sign must be at most 20 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"
});


class SignUpStore {

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

    setUserName(userName: string) {
        this.userName = userName;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setConfirmPassword(confirmPassword: string) {
        this.confirmPassword = confirmPassword;
    }

    setAtSign(atSign: string) {
        this.atSign = atSign;
    }

    setShowPassword(showPassword: boolean) {
        this.showPassword = showPassword;
    }

    setShowConfirmPassword(showConfirmPassword: boolean) {
        this.showConfirmPassword = showConfirmPassword;
    }

    checkValidation() {
        const result = SignupSchema.safeParse({
            userName: this.userName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            atSign: this.atSign,
        });

        if (!result.success)
            this.validationErrors = result.error.issues.map(
                (issue) => issue.message
            );
        else {
            this.reset()
            console.log('paso la valid');
        }


    }

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

export default SignUpStore