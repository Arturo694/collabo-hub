import {
    LuLayers,
    LuBookOpen,
    LuDollarSign,
    LuBuilding2,
    LuLogIn
} from "react-icons/lu";
import { Link } from "react-router";
import { ROUTES } from "../lib/routes";

export default function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-16">
                <Link to={ROUTES.HOME} className="font-gabarito font-bold text-2xl text-custom-blue tracking-tight">
                    Collabo-Hub
                </Link>
                <ul className="font-outfit flex items-center justify-end gap-8 text-sm font-medium text-neutral-600">
                    <li>
                        <Link to={ROUTES.SERVICES} className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                            <LuLayers size={16} />
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.RESOURCES} className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                            <LuBookOpen size={16} />
                            Resources
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.PRICING} className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                            <LuDollarSign size={16} />
                            Pricing
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.ENTERPRISE} className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                            <LuBuilding2 size={16} />
                            Enterprise
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGNIN} className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                            <LuLogIn size={16} />
                            Sign in
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGNUP} className="bg-custom-blue hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all font-medium">
                            Join for free
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}