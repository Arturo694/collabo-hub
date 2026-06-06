import { makeAutoObservable } from "mobx";
import { type ContactsAllMyContactsResponse } from '@collabo-hub/shared'

type Contacts = ContactsAllMyContactsResponse["contacts"]
export type Contact = Contacts[number]

export class ContactStore {
    contacts: Contacts = [];
    search: string = "";
    searchContacts: string = "";
    showDialog: boolean = false;
    seekResults: Contacts = [];
    seekLoading: boolean = false;
    error: string = "";

    constructor() { makeAutoObservable(this) }

    setSearch(value: string) { this.search = value }

    setSearchContacts(value: string) { this.searchContacts = value }

    setSeekResults(results: Contacts) { this.seekResults = results }

    setSeekLoading(value: boolean) { this.seekLoading = value }

    setContacts(contacts: Contacts) { this.contacts = contacts }

    setError(value: string) { this.error = value }

    init(contacts: Contacts) {
        this.contacts = contacts;
        this.error = "";
    }

    setDialog(value: boolean) {
        this.showDialog = value;
        if (!value) {
            this.searchContacts = "";
            this.seekResults = [];
            this.seekLoading = false;
            this.error = "";
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
