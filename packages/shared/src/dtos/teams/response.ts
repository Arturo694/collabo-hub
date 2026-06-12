export interface TeamsCreateTeamResponse {
    success: boolean;
    message: string;
}

export interface TeamsMyTeamsResponse {
    success: boolean;
    teams: Array<{
        id: string;
        name: string;
        description: string;
        createdBy: string;
        isOwner: boolean;
    }>;
}
