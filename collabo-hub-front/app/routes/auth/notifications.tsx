import { type LoaderFunctionArgs, redirect, useLoaderData, type MetaFunction } from "react-router";
import { notificationsAllMyNotifications } from "~/lib/api";
import { ROUTES } from "~/lib/routes";
import { NotificationsView } from "~/components/Notifications/Notifications";

export const meta: MetaFunction = () => {
    return [
        { title: "Notifications | Collabo-Hub" },
        { name: "description", content: "Stay updated with the latest activity and updates from your team." },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null) throw new Error();

    try {
        const { notifications } = await notificationsAllMyNotifications(cookie);
        return notifications;
    } catch {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function Notifications() {
    const notifications = useLoaderData<typeof loader>();

    return (
        <div className="w-full min-h-screen p-10 bg-white font-outfit">
            <div className="max-w-3xl mx-auto">

                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-gabarito text-3xl font-bold text-neutral-800 tracking-tight">
                            Notifications
                        </h1>
                        <p className="font-outfit text-sm text-neutral-500 mt-1">
                            Stay updated with the latest activity and updates from your team.
                        </p>
                    </div>
                </div>

                <NotificationsView notifications={notifications} />

            </div>
        </div>
    );
}
