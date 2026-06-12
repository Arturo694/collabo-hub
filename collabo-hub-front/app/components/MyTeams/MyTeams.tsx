import { LuPlus, LuDownload } from "react-icons/lu";
import { observer } from "mobx-react-lite";
import type { TeamStore } from "./CreateTeam/teamStore";
import type { ListTeamStore } from "./ListTeams/listTeamsStore";
import { CreateTeamDialog } from "./CreateTeam/CreateTeamDialog";
import { ListTeams } from "./ListTeams/ListTeams";

export const MyTeamsView = observer(({ createStore, listStore }: { createStore: TeamStore; listStore: ListTeamStore }) => {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => createStore.setCreateTeam(true)}
                    className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                    <LuPlus size={14} />
                    Create team
                </button>
                <button
                    className="border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                    <LuDownload size={14} />
                    Export team
                </button>
            </div>

            <CreateTeamDialog store={createStore} />

            <div className="mt-8 pt-8 border-t border-neutral-100">
                <ListTeams store={listStore} />
            </div>
        </>
    );
});
