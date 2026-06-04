import { Outlet, useLoaderData, redirect, type LoaderFunctionArgs } from "react-router";
import { iamMe } from "../lib/api";
import { ROUTES } from "../lib/routes";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    try {
        const user = await iamMe(cookie);
        return { user };
    } catch (error) {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function ProtectedLayout() {
    useLoaderData<typeof loader>();
    return (
        <main>
            <Outlet />
        </main>
    );
}