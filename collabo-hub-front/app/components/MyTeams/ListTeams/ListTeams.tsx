import { observer } from "mobx-react-lite";
import type { ListTeamStore } from "./listTeamsStore";

export const ListTeams = observer(({ store }: { store: ListTeamStore }) => {
    const renderTeam = (t: { id: string; name: string; description: string; createdBy: string; isOwner: boolean }) => (
        <div
            key={t.id}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-full bg-custom-blue flex items-center justify-center text-white font-semibold text-xs shrink-0">
                {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-outfit text-[13px] font-semibold text-neutral-800 truncate">
                    {t.name}
                </p>
                {t.description && (
                    <p className="font-outfit text-[12px] text-neutral-500 truncate">
                        {t.description}
                    </p>
                )}
                {!t.isOwner && (
                    <p className="font-outfit text-[11px] text-neutral-400 mt-0.5">
                        Created by {t.createdBy}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* ── My teams ── */}
            <div>
                <h2 className="font-gabarito text-lg font-bold text-neutral-800 mb-3">
                    My teams
                </h2>
                {store.myTeams.length > 0 ? (
                    <div className="flex flex-col gap-1">
                        {store.myTeams.map(renderTeam)}
                    </div>
                ) : (
                    <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                        You haven't created any teams yet
                    </p>
                )}
            </div>

            {/* ── Collaborating ── */}
            <div>
                <h2 className="font-gabarito text-lg font-bold text-neutral-800 mb-3">
                    Collaborating
                </h2>
                {store.collaborating.length > 0 ? (
                    <div className="flex flex-col gap-1">
                        {store.collaborating.map(renderTeam)}
                    </div>
                ) : (
                    <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                        You're not collaborating on any teams yet
                    </p>
                )}
            </div>
        </div>
    );
});
