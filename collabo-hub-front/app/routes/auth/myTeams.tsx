import { type MetaFunction } from "react-router";
import { TeamStore } from "../../components/MyTeams/CreateTeam/teamStore";
import { MyTeamsView } from "../../components/MyTeams/MyTeams";

export const meta: MetaFunction = () => {
    return [
        { title: "My Teams | Collabo-Hub" },
        { name: "description", content: "Manage your teams and collaborate effectively." },
    ];
};

const store = new TeamStore();

export default function MyTeams() {
    return (
        <div className="w-full min-h-screen p-10 bg-white font-outfit">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-gabarito text-3xl font-bold text-neutral-800 tracking-tight">
                            My Teams
                        </h1>
                        <p className="font-outfit text-sm text-neutral-500 mt-1">
                            Manage your teams and collaborate effectively.
                        </p>
                    </div>
                </div>

                <MyTeamsView store={store} />
            </div>
        </div>
    );
}
