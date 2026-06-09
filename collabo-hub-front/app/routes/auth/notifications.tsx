import { type LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import { notificationsAllMyNotifications } from "../../lib/api";
import { ROUTES } from "~/lib/routes";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null) throw new Error();

    try {
        await notificationsAllMyNotifications(cookie);
        // return notifications;
    } catch (error) {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function Notifications() {
    return (
        <div className="w-full min-h-screen p-10 bg-white font-outfit">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-gabarito text-3xl font-bold text-neutral-800 tracking-tight">
                    Notifications
                </h1>
                <p className="font-outfit text-sm text-neutral-500 mt-1">
                    Stay updated with the latest activity and updates from your team.
                </p>
            </div>
        </div>
    );
}
