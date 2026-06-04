import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { iamMe } from "../lib/api";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    await iamMe(cookie);
    return null;
}

export default function ProtectedLayout() {
    useLoaderData<typeof loader>();
    return (
        <main>
            <Outlet />
        </main>
    );
}