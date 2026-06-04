import { Outlet, useLoaderData, redirect, type LoaderFunctionArgs } from "react-router";
import { iamMe } from "../lib/api";
import { ROUTES } from "../lib/routes";

import Sidebar from "../components/Sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null)
        throw new Error()

    try {
        const user = await iamMe(cookie);
        return user
    } catch (error) {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function ProtectedLayout() {
    const { name, atSign } = useLoaderData<typeof loader>();
    return (
        <main className="flex">
            <Sidebar name={name} atSign={atSign} />
            <div className="w-full">
                <Outlet />
            </div>
        </main>
    );
}