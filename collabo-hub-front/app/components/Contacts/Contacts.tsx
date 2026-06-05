import {
    LuSearch,
    LuMail,
    LuX,
    LuPin,
    LuPlus,
    LuAtSign,
    LuCalendarDays,
    LuCircleUser,
    LuTrash2,
} from "react-icons/lu";
import { observer } from "mobx-react-lite";
import type { Contact, ContactStore } from "./contactStore";

export const ContactsView = observer(({ store }: { store: ContactStore }) => {
    return (
        <div className="w-full min-h-screen p-10 bg-white font-outfit">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-gabarito text-3xl font-bold text-neutral-800 tracking-tight">
                            Contacts
                        </h1>
                        <p className="font-outfit text-sm text-neutral-500 mt-1">
                            Manage your contacts and stay connected with your team.
                        </p>
                    </div>
                    {!store.isEmpty && (
                        <button
                            // onClick={}
                            className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                            <LuPlus size={14} />
                            Add contact
                        </button>
                    )}
                </div>

                {store.isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
                        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-5">
                            <LuCircleUser size={40} className="text-neutral-300" />
                        </div>
                        <p className="text-[15px] font-outfit font-medium text-neutral-600 mb-1">
                            No contacts yet
                        </p>
                        <p className="text-[13px] font-outfit text-neutral-400 mb-5">
                            Add your first contact to get started.
                        </p>
                        <button className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5">
                            <LuPlus size={14} />
                            Add contact
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2 px-4 h-10.5 bg-neutral-50 rounded-xl border border-neutral-200 focus-within:border-custom-blue/40 transition-colors mb-5">
                            <LuSearch
                                size={15}
                                className={`shrink-0 transition-colors ${store.search ? "text-custom-blue" : "text-neutral-400"}`}
                            />
                            <input
                                value={store.search}
                                onChange={(e) => store.setSearch(e.target.value)}
                                placeholder="Search contacts..."
                                className="bg-transparent border-none text-neutral-600 text-[13px] w-full outline-none placeholder:text-neutral-400"
                            />
                            {store.search && (
                                <button
                                    onClick={() => store.setSearch("")}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    <LuX size={14} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            {store.filtered.map((c: Contact) => (
                                <div
                                    key={c.id}
                                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-custom-blue flex items-center justify-center text-white font-semibold text-xs shrink-0">
                                        {c.name
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-outfit text-[11px] text-neutral-500 truncate flex items-center gap-1">
                                            <LuAtSign size={10} className="text-neutral-400" />
                                            {c.atSign}
                                        </p>
                                    </div>

                                    <div className="flex-1 min-w-0 hidden sm:block">
                                        <p className="font-outfit text-[12px] text-neutral-600 truncate">
                                            {c.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        <LuCalendarDays size={11} className="text-neutral-300" />
                                        <p className="font-outfit text-[10px] text-neutral-400">
                                            {new Date(c.joined).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-custom-blue/10 hover:text-custom-blue transition-all">
                                            <LuMail size={13} />
                                        </button>
                                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all">
                                            <LuTrash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {store.filtered.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                                        <LuCircleUser size={32} className="text-neutral-300" />
                                    </div>
                                    <p className="text-[14px] font-outfit font-medium text-neutral-500 mb-1">
                                        No contacts found
                                    </p>
                                    <p className="text-[12px] font-outfit text-neutral-400">Try a different search</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 pt-3 border-t border-neutral-100">
                            <p className="font-outfit text-[11px] text-neutral-400">
                                {store.filtered.length} of {store.contacts.length} contacts
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
