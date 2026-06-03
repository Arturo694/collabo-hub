export interface IamSignUpRequest {
    name: string;
    email: string;
    password: string;
    atSign: string;
}

export interface IamSignInRequest {
    email: string;
    password: string;
}