import type { Route } from "./+types/signup";
import { Link } from "react-router";
import FormSignUp from "../components/forms/form-sign-up/FormSignUp";


export function meta({ }: Route.MetaArgs) {
    return [
        {
            title: "Join Collabo-Hub — Start collaborating today"
        },
        {
            name: "description",
            content: "Create your account and start collaborating with your team."
        },
    ];
}

export default function SignUp() {

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-5 py-16">
            <div className="border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="font-gabarito text-2xl font-bold text-custom-blue mb-1">
                    Create an account
                </h2>
                <p className="font-outfit text-sm text-neutral-500 mb-6">
                    Start collaborating today.
                </p>
                <FormSignUp />
                <p className="font-outfit text-xs text-neutral-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-custom-blue hover:underline font-medium">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
