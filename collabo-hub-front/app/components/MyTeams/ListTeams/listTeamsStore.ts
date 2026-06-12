import { makeAutoObservable } from "mobx";
import type { TeamsMyTeamsResponse } from "@collabo-hub/shared";

type TeamEntry = TeamsMyTeamsResponse["teams"][number];

export class ListTeamStore {
    teams: TeamEntry[] = [];

    constructor() { makeAutoObservable(this) }

    init(teams: TeamEntry[]) {
        this.teams = teams;
    }

    get myTeams() {
        return this.teams.filter((t) => t.isOwner);
    }

    get collaborating() {
        return this.teams.filter((t) => !t.isOwner);
    }
}
