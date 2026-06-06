import axios from "axios";
import type {
    IamSignInRequest,
    IamSignInResponse,
    IamSignUpRequest,
    IamSignUpResponse,
    IamMeResponse,
    IamSignOutResponse,
    ContactsAllMyContactsResponse,
    ContactsCreateContactRequest,
    GenericResponse
} from '@collabo-hub/shared';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
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

export async function iamMe(cookieHeader: string): Promise<IamMeResponse> {
    const res = await api.get<IamMeResponse>("/iam/me", {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
        withCredentials: true
    });
    return res.data;
}

export async function iamSignOut(): Promise<IamSignOutResponse> {
    const res = await api.get<IamSignOutResponse>("/iam/signout", {
        withCredentials: true
    })

    return res.data
}


export async function contactsFindAll(
    cookieHeader: string
): Promise<ContactsAllMyContactsResponse> {
    const res = await api.get<ContactsAllMyContactsResponse>("/contacts/allMyContacts", {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
        withCredentials: true
    })

    return res.data
}

export async function contactsSeek(
    contact: string
): Promise<ContactsAllMyContactsResponse> {
    const res = await api.get<ContactsAllMyContactsResponse>(`/contacts/searchContacts/${contact}`,
        { withCredentials: true })

    return res.data
}

export async function createContact(
    data: ContactsCreateContactRequest
): Promise<GenericResponse> {
    const res = await api.post<GenericResponse>(
        "/contacts/createContact",
        data,
        { withCredentials: true }
    )

    return res.data
}

export async function deleteContact(
    idContact: string
): Promise<GenericResponse> {
    const res = await api.delete<GenericResponse>(`/contacts/deleteContact/${idContact}`, {
        withCredentials: true
    })

    return res.data
}