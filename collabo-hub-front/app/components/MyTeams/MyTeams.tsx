import { LuPlus, LuDownload } from "react-icons/lu";
import { observer } from "mobx-react-lite";
import type { TeamStore } from "./CreateTeam/teamStore";
import { CreateTeamDialog } from "./CreateTeam/CreateTeamDialog";

export const MyTeamsView = observer(({ store }: { store: TeamStore }) => {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => store.setCreateTeam(true)}
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

            <CreateTeamDialog store={store} />
        </>
    );
});
