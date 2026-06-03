import type { Route } from "./+types/signin";
import { Link } from "react-router";
import { ROUTES } from "../lib/routes";
import FormSignIn from "../components/forms/form-sign-in/FormSignIn";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Sign in — Collabo-Hub" },
        { name: "description", content: "Sign in to your account and continue collaborating." },
    ];
}

export default function SignIn() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-5 py-16">
            <div className="border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="font-gabarito text-2xl font-bold text-custom-blue mb-1">
                    Welcome back
                </h2>
                <p className="font-outfit text-sm text-neutral-500 mb-6">
                    Sign in to your account.
                </p>
                <FormSignIn />
                <p className="font-outfit text-xs text-neutral-500 text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <Link to={ROUTES.SIGNUP} className="text-custom-blue hover:underline font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
