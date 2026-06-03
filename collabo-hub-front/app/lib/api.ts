import axios from "axios";
import type {
    IamSignInRequest,
    IamSignInResponse,
    IamSignUpRequest,
    IamSignUpResponse
} from '@collabo-hub/shared';

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export class ApiError extends Error {
    public readonly messages: string[];

    constructor(messages: string | string[]) {
        const normalized = Array.isArray(messages) ? messages : [messages];
        super(normalized.join(", "));
        this.name = "ApiError";
        this.messages = normalized;
    }
}

export async function iamSignIn(data: IamSignInRequest): Promise<IamSignInResponse> {
    const res = await api.post<IamSignInResponse>("/iam/signin", data);
    if (!res.data.success) throw new ApiError(res.data.message);
    return res.data;
}

export async function iamSignUp(data: IamSignUpRequest): Promise<IamSignUpResponse> {
    const res = await api.post<IamSignUpResponse>("/iam/signup", data);
    if (!res.data.success) throw new ApiError(res.data.messages);
    return res.data;
}
