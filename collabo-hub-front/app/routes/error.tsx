import { Link } from "react-router";
import { ROUTES } from "../lib/routes";
import { LuArrowLeft } from "react-icons/lu";

export function meta() {
    return [
        { title: "500 — Something went wrong" },
    ];
}

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-5 text-center">
            <h1 className="font-gabarito text-8xl font-bold text-custom-blue">500</h1>
            <p className="font-outfit text-neutral-500 mt-4 max-w-sm leading-relaxed">
                Something went wrong. We're working on fixing it.
            </p>
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-2 mt-8 bg-custom-blue hover:opacity-90 text-white font-outfit font-medium px-6 py-3 rounded-lg transition-all text-sm">
                <LuArrowLeft size={16} />
                Go back home
            </Link>
        </div>
    );
}
