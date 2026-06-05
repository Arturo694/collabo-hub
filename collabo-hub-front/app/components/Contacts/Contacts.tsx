import {
    LuSearch,
    LuMail,
    LuX,
    LuPlus,
    LuAtSign,
    LuCalendarDays,
    LuTrash2,
} from "react-icons/lu";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react'


import { observer } from "mobx-react-lite";
import type { Contact, ContactStore } from "./contactStore";
import { createContact } from '../../lib/api';

export const ContactsView = observer(({ store }: { store: ContactStore }) => {
    return (
        <>
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
                        <button
                            onClick={() => store.setDialog(true)}
                            className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                            <LuPlus size={14} />
                            Add contact
                        </button>
                    </div>

                    <div className="relative mb-5">
                        <LuSearch
                            size={15}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${store.search ? "text-custom-blue" : "text-neutral-400"}`}
                        />
                        <input
                            value={store.search}
                            onChange={(e) => store.setSearch(e.target.value)}
                            placeholder="Search contacts..."
                            className="w-full border border-neutral-200 rounded-lg pl-10 pr-9 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                        />
                        {store.search && (
                            <button
                                onClick={() => store.setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
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
                                <p className="text-[14px] font-outfit font-medium text-neutral-500 mb-1">
                                    No contacts found
                                </p>
                                <p className="text-[12px] font-outfit text-neutral-400">
                                    Try a different search
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-100">
                        <p className="font-outfit text-[11px] text-neutral-400">
                            {store.filtered.length} of {store.contacts.length} contacts
                        </p>
                    </div>

                </div>
            </div>

            {/* ── Add Contact Dialog ── */}
            <Transition show={store.showDialog}>
                <Dialog onClose={() => store.setDialog(false)} className="relative z-50">
                    <TransitionChild
                        as="div"
                        className="fixed inset-0 bg-black/50"
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <TransitionChild
                            as={DialogPanel}
                            className="w-full max-w-md min-h-105 bg-white rounded-2xl shadow-xl p-6"
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <DialogTitle className="font-gabarito text-lg font-bold text-neutral-800">
                                    Add contact
                                </DialogTitle>
                                <button
                                    onClick={() => store.setDialog(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-custom-blue text-white hover:opacity-90 transition-all"
                                >
                                    <LuX size={15} />
                                </button>
                            </div>

                            <div className="relative mb-4">
                                <LuSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input
                                    value={store.searchContacts}
                                    onChange={(e) => store.setSearchContacts(e.target.value)}
                                    placeholder="Search by name or @..."
                                    className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                                />
                            </div>

                            {store.seekLoading ? (
                                <div className="text-center py-8">
                                    <p className="font-outfit text-[13px] text-neutral-400">Searching...</p>
                                </div>
                            ) : store.seekResults.length > 0 ? (
                                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                                    {store.seekResults.map((c: Contact) => (
                                        <div
                                            key={c.id}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-custom-blue flex items-center justify-center text-white font-semibold text-xs shrink-0">
                                                {c.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-outfit text-[13px] font-semibold text-neutral-800 truncate">
                                                    {c.name}
                                                </p>
                                                <p className="font-outfit text-[11px] text-neutral-500 truncate flex items-center gap-1">
                                                    <LuAtSign size={10} className="text-neutral-400" />
                                                    {c.atSign}
                                                </p>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    await createContact({ idContact: c.id, email: c.email });
                                                }}
                                                className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[11px] px-3 py-1.5 rounded-lg transition-all">
                                                Conectar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : store.searchContacts ? (
                                <div className="text-center py-8">
                                    <p className="font-outfit text-[13px] text-neutral-400">
                                        No users found
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="font-outfit text-[13px] text-neutral-400">
                                        Type a name or @ to find users
                                    </p>
                                </div>
                            )}

                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});
