export interface TeamsCreateTeamRequest {
    name: string;
    description: string;
    tags: string[];
    members: string[];
    statuses: Array<{
        name: string;
        description: string;
        color: string;
        type: "status" | "priority";
    }>;
}
