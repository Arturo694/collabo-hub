import { makeAutoObservable } from "mobx";

export class TeamStore {
    showCreateTeam: boolean = false

    constructor() { makeAutoObservable(this) }

    setCreateTeam(value: boolean) {
        this.showCreateTeam = value
    }
}
