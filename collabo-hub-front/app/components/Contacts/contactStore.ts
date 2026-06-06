import { makeAutoObservable } from "mobx";
import { type ContactsAllMyContactsResponse } from '@collabo-hub/shared'
import { contactsSeek, contactsFindAll } from "../../lib/api";

type Contacts = ContactsAllMyContactsResponse["contacts"]
export type Contact = Contacts[number]

export class ContactStore {
    contacts: Contacts = [];
    search: string = "";
    searchContacts: string = "";
    showDialog: boolean = false;
    seekResults: Contacts = [];
    seekLoading: boolean = false;

    constructor() { makeAutoObservable(this) }

    setSearch(value: string) { this.search = value }

    async setSearchContacts(value: string) {
        this.searchContacts = value;
        if (!value.trim()) {
            this.seekResults = [];
            this.seekLoading = false;
            return;
        }
        this.seekLoading = true;
        this.seekResults = [];
        try {
            const { contacts } = await contactsSeek(value);
            this.seekResults = contacts;
        } catch {
            this.seekResults = [];
        } finally {
            this.seekLoading = false;
        }
    }

    init(contacts: Contacts) { this.contacts = contacts }

    async refreshContacts() {
        try {
            const { contacts } = await contactsFindAll("");
            this.contacts = contacts;
        } catch {
            // silently fail
        }
    }

    setDialog(value: boolean) {
        this.showDialog = value;
        if (!value) {
            this.searchContacts = "";
            this.seekResults = [];
            this.seekLoading = false;
        }
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