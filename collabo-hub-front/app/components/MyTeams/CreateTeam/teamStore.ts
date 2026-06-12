import { makeAutoObservable } from "mobx";
import type { ContactsAllMyContactsResponse } from "@collabo-hub/shared";

type Contact = ContactsAllMyContactsResponse["contacts"][number];

type StatusEntry = { name: string; description: string; color: string; type: "status" | "priority" }

export class TeamStore {
    showArmTeam: boolean = false
    showSearchContacts: boolean = false
    showStatuses: boolean = false
    teamName: string = ""
    teamDescription: string = ""
    tags: string[] = []
    currentTag: string = ""
    error: string = ""
    availableContacts: Contact[] = []
    selectedMembers: string[] = []
    contactSearch: string = ""
    statuses: StatusEntry[] = []
    currentStatusName: string = ""
    currentStatusDescription: string = ""
    currentStatusColor: string = ""
    currentStatusType: "status" | "priority" = "status"
    loading: boolean = false

    constructor() { makeAutoObservable(this) }

    setLoading(value: boolean) { this.loading = value }

    resetAll() {
        this.showArmTeam = false
        this.showSearchContacts = false
        this.showStatuses = false
        this.teamName = ""
        this.teamDescription = ""
        this.tags = []
        this.currentTag = ""
        this.error = ""
        this.availableContacts = []
        this.selectedMembers = []
        this.contactSearch = ""
        this.statuses = []
        this.currentStatusName = ""
        this.currentStatusDescription = ""
        this.currentStatusColor = ""
        this.currentStatusType = "status"
        this.loading = false
    }

    setCreateTeam(value: boolean) {
        if (value) {
            this.showArmTeam = true
            this.showSearchContacts = false
            this.showStatuses = false
        } else {
            this.showArmTeam = false
            this.showSearchContacts = false
            this.showStatuses = false
        }
        this.error = ""
    }

    continueToSearchContacts() {
        this.showArmTeam = false
        this.showSearchContacts = true
        this.error = ""
    }

    continueToStatuses() {
        this.showSearchContacts = false
        this.showStatuses = true
        this.error = ""
    }

    backToArmTeam() {
        this.showSearchContacts = false
        this.showArmTeam = true
    }

    backToSearchContacts() {
        this.showStatuses = false
        this.showSearchContacts = true
    }

    setError(value: string) { this.error = value }

    setTeamName(value: string) { this.teamName = value }

    setTeamDescription(value: string) { this.teamDescription = value }

    setCurrentTag(value: string) { this.currentTag = value }

    setAvailableContacts(contacts: Contact[]) { this.availableContacts = contacts }

    setContactSearch(value: string) { this.contactSearch = value }

    toggleMember(id: string) {
        if (this.selectedMembers.includes(id)) {
            this.selectedMembers = this.selectedMembers.filter((m) => m !== id)
        } else {
            this.selectedMembers.push(id)
        }
    }

    addTag() {
        const tag = this.currentTag.trim()
        if (tag && !this.tags.includes(tag)) {
            this.tags.push(tag)
            this.currentTag = ""
        }
    }

    removeTag(index: number) {
        this.tags.splice(index, 1)
    }

    setCurrentStatusName(value: string) { this.currentStatusName = value }

    setCurrentStatusDescription(value: string) { this.currentStatusDescription = value }

    setCurrentStatusColor(value: string) { this.currentStatusColor = value }

    setCurrentStatusType(value: "status" | "priority") { this.currentStatusType = value }

    addStatus() {
        const name = this.currentStatusName.trim()
        if (!name) return
        this.statuses.push({
            name,
            description: this.currentStatusDescription.trim(),
            color: this.currentStatusColor.trim(),
            type: this.currentStatusType,
        })
        this.currentStatusName = ""
        this.currentStatusDescription = ""
        this.currentStatusColor = ""
        this.currentStatusType = "status"
    }

    removeStatus(index: number) {
        this.statuses.splice(index, 1)
    }

    get filteredContacts() {
        const q = this.contactSearch.toLowerCase()
        return this.availableContacts.filter(
            (c) =>
                c.name?.toLowerCase().includes(q) ||
                c.atSign?.toLowerCase().includes(q)
        )
    }
}
