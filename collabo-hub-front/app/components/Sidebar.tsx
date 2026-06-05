import {
    LuHouse,
    LuLayoutDashboard,
    LuClipboardList,
    LuBookOpen,
    LuSettings,
    LuLogOut,
    LuStickyNote,
    LuMilestone
} from "react-icons/lu";
import { useNavigate, Link, useLocation } from "react-router";
import { ROUTES } from '../lib/routes'
import type { IamMeResponse } from '@collabo-hub/shared'
import { iamSignOut } from '../lib/api'

export default function Sidebar(
    { atSign, name }: Pick<IamMeResponse, 'atSign' | 'name'>
) {
    const navigate = useNavigate();
    const location = useLocation();

    const OVERVIEW_MENU = [
        { label: 'Home', icon: LuLayoutDashboard, path: ROUTES.AUTH_DASHBOARD },
        { label: 'My teams', icon: LuHouse, path: ROUTES.AUTH_TEAMS },
        { label: 'Tasks', icon: LuClipboardList, path: ROUTES.AUTH_TASKS },
        { label: 'Notes', icon: LuStickyNote, path: ROUTES.AUTH_NOTES },
        { label: 'Phases', icon: LuMilestone, path: ROUTES.AUTH_PHASES },
        { label: 'Contacts', icon: LuBookOpen, path: ROUTES.AUTH_CONTACTS },
    ];

    const SETTINGS_MENU = [
        { label: 'Settings', icon: LuSettings, path: ROUTES.AUTH_PREFERENCES },
    ];

    return (
        <aside className="w-17 border-r border-custom-blue/20 h-screen flex flex-col bg-custom-blue items-center py-4">


            <div className="relative group mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-custom-blue text-sm font-semibold cursor-default">
                    {name.charAt(0).toUpperCase()}
                </div>
                <Tooltip>{name} <span className="opacity-70">{atSign}</span></Tooltip>
            </div>

            <nav className="flex-1 flex flex-col items-center gap-1 w-full">
                {OVERVIEW_MENU.map((item) => (
                    <NavItem key={item.label} item={item} isActive={location.pathname === item.path} />
                ))}
            </nav>


            <div className="w-8 h-px bg-white/20 my-3" />


            <div className="flex flex-col items-center gap-1 w-full">
                {SETTINGS_MENU.map((item) => (
                    <NavItem key={item.label} item={item} isActive={location.pathname === item.path} />
                ))}
            </div>


            <div className="mt-3">
                <div className="relative group">
                    <button
                        onClick={async () => {
                            await iamSignOut()
                            navigate(ROUTES.SIGNIN)
                        }}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-custom-blue transition-all"
                    >
                        <LuLogOut size={17} />
                    </button>
                    <Tooltip>Sign out</Tooltip>
                </div>
            </div>
        </aside>
    );
}

function NavItem(
    { item, isActive }: {
        item: {
            label: string;
            icon: React.ComponentType<{ size?: number }>;
            path: string
        };
        isActive: boolean
    }) {
    const Icon = item.icon;
    return (
        <div className="relative group w-full flex justify-center">
            <Link
                to={item.path}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive
                    ? "bg-white text-custom-blue"
                    : "text-white/70 hover:bg-white hover:text-custom-blue"
                    }`}
            >
                <Icon size={17} />
            </Link>
            <Tooltip>{item.label}</Tooltip>
        </div>
    );
}

function Tooltip({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="relative">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-custom-blue rotate-45" />
                <div className="bg-custom-blue text-white text-xs font-outfit font-medium rounded-lg px-3 py-1.5 whitespace-nowrap">
                    {children}
                </div>
            </div>
        </div>
    );
}
