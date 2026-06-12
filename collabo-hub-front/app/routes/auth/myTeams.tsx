import { type LoaderFunctionArgs, useLoaderData, type MetaFunction } from "react-router";
import { TeamStore } from "../../components/MyTeams/CreateTeam/teamStore";
import { ListTeamStore } from "../../components/MyTeams/ListTeams/listTeamsStore";
import { MyTeamsView } from "../../components/MyTeams/MyTeams";
import { myTeams } from "../../lib/api";

export const meta: MetaFunction = () => {
    return [
        { title: "My Teams | Collabo-Hub" },
        { name: "description", content: "Manage your teams and collaborate effectively." },
    ];
};

const createTeamStore = new TeamStore();
const listTeamStore = new ListTeamStore();

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null) throw new Error();

    const { teams } = await myTeams(cookie);
    return teams;
}

export default function MyTeams() {
    const data = useLoaderData<typeof loader>();
    listTeamStore.init(data);

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

                <MyTeamsView createStore={createTeamStore} listStore={listTeamStore} />
            </div>
        </div>
    );
}
