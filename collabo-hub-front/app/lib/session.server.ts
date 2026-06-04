import { redirect } from "react-router";
import { ROUTES } from "./routes";

const API_URL = "http://localhost:3000";

export async function requireAuth(request: Request) {
    const res = await fetch(`${API_URL}/iam/me`, {
        headers: { cookie: request.headers.get("cookie") ?? "" },
    });

    if (!res.ok) throw redirect(ROUTES.SIGNIN);
    return res.json() as Promise<{ id: string; email: string }>;
}
