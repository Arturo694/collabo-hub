export interface IamSignUpResponse {
    success: boolean;
    messages: Array<string>;
}

export interface IamSignInResponse {
    success: boolean;
    message: string;
}

export interface IamMeResponse {
    id: string
}