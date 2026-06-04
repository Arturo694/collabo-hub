import {
    LuHouse,
    LuLayoutDashboard,
    LuClipboardList,
    LuBookOpen,
    LuSettings,
    LuLogOut,
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { ROUTES } from '../lib/routes'
import type { IamMeResponse } from '@collabo-hub/shared'
import { iamSignOut } from '../lib/api'


export default function Sidebar(
    { atSign, name }: Pick<IamMeResponse, 'atSign' | 'name'>
) {
    const navigate = useNavigate()

    return (
        <div className="w-1/4 border-r border-neutral-200 h-screen flex flex-col bg-white">

            {/* Usuario */}
            <div className="px-4 py-5 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-custom-blue flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="font-outfit text-sm font-medium text-neutral-800 leading-none truncate">
                            {name}
                        </p>
                        <p className="font-outfit text-xs text-neutral-400 mt-0.5 truncate">
                            {atSign}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="font-outfit text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-2 pb-2">
                    Main menu
                </p>

                <NavItem icon={LuHouse} label="Home" />
                <NavItem icon={LuLayoutDashboard} label="My teams" badge="3" active />
                <NavItem icon={LuClipboardList} label="Tasks" badge="12" />
                <NavItem icon={LuBookOpen} label="Contacts" />

                <p className="font-outfit text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-2 pt-5 pb-2">
                    Account
                </p>

                <NavItem icon={LuSettings} label="Settings" />
            </nav>

            {/* Cerrar sesión al fondo */}
            <div className="px-3 py-3 border-t border-neutral-200">
                <button
                    onClick={async () => {
                        await iamSignOut()
                        navigate(ROUTES.SIGNIN)
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-outfit text-sm text-neutral-500 hover:bg-custom-blue hover:text-white transition-colors">
                    <LuLogOut size={17} />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    );
}

function NavItem({
    icon: Icon,
    label,
    badge,
    active = false,
}: {
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    badge?: string;
    active?: boolean;
}) {
    return (
        <button
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-outfit text-sm transition-all ${active
                ? "bg-custom-blue text-white font-medium"
                : "text-neutral-600 hover:bg-custom-blue hover:text-white"
                }`}
        >
            <Icon size={17} />
            <span className="flex-1 text-left">{label}</span>
            {badge && (
                <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${active
                    ? "bg-white/20 text-white"
                    : "bg-custom-blue/10 text-custom-blue"
                    }`}>
                    {badge}
                </span>
            )}
        </button>
    );
}