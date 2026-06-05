export interface ContactsAllMyContactsResponse {
    success: true;
    contacts: Array<{
        id: string
        name: string,
        atSign: string,
        email: string,
        joined: Date
    }>
}

export interface ContactsCreateContactResponse {
    success: boolean;
    message: string;
}