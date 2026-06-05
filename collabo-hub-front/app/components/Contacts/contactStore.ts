import { makeAutoObservable } from "mobx";
import { type ContactsAllMyContactsResponse } from '@collabo-hub/shared'

type Contacts = ContactsAllMyContactsResponse["contacts"]
export type Contact = Contacts[number]

export class ContactStore {
    contacts: Contacts = [];
    search: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(value: string) {
        this.search = value;
    }

    init(contacts: Contacts) {
        this.contacts = contacts;
    }

    get filtered() {
        const q = this.search.toLowerCase();
        return this.contacts.filter(
            (c: any) =>
                c.name?.toLowerCase().includes(q) ||
                c.email?.toLowerCase().includes(q) ||
                c.atSign?.toLowerCase().includes(q)
        );
    }

    get isEmpty() {
        return this.contacts.length === 0;
    }

    reset() {
        this.contacts = [];
        this.search = "";
    }
}