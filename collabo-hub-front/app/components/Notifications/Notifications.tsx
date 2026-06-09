import { LuBell } from "react-icons/lu";
import type { AllMyNotificationsResponse } from "@collabo-hub/shared";

type Notification = AllMyNotificationsResponse["notifications"][number];

export function NotificationsView({ notifications }: { notifications: Notification[] }) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                <LuBell size={32} className="mb-3 text-neutral-300" />
                <p className="text-[14px] font-outfit font-medium text-neutral-500 mb-1">
                    No notifications yet
                </p>
                <p className="text-[12px] font-outfit text-neutral-400">
                    We'll notify you when something new arrives.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {notifications.map((n: Notification, i: number) => (
                <div
                    key={i}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-full bg-custom-blue flex items-center justify-center text-white shrink-0">
                        <LuBell size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-outfit text-[13px] font-semibold text-neutral-800">
                            {n.title}
                        </p>
                        <p className="font-outfit text-[12px] text-neutral-500 mt-0.5">
                            {n.message}
                        </p>
                    </div>
                    <div className="shrink-0">
                        <p className="font-outfit text-[10px] text-neutral-400 whitespace-nowrap">
                            {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
