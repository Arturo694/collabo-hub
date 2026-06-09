import { makeAutoObservable } from "mobx";

export class TeamStore {
    showArmTeam: boolean = false
    showSearchContacts: boolean = false
    showStatuses: boolean = false
    teamName: string = ""
    teamDescription: string = ""
    tags: string[] = []
    currentTag: string = ""
    error: string = ""

    constructor() { makeAutoObservable(this) }

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

    setError(value: string) { this.error = value }

    setTeamName(value: string) { this.teamName = value }

    setTeamDescription(value: string) { this.teamDescription = value }

    setCurrentTag(value: string) { this.currentTag = value }

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
}
