export interface IamSignUpResponse {
    success: boolean;
    messages: Array<string>;
}

export interface IamSignInResponse {
    success: boolean;
    token: string;
}