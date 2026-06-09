import { LuSearch, LuX, LuPlus, LuDownload } from "react-icons/lu";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { observer } from "mobx-react-lite";
import type { TeamStore } from "./teamStore";

export const MyTeamsView = observer(({ store }: { store: TeamStore }) => {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => store.setCreateTeam(true)}
                    className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                    <LuPlus size={14} />
                    Create team
                </button>
                <button
                    className="border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-outfit font-medium text-[13px] px-4 py-2 rounded-full transition-all flex items-center gap-1.5">
                    <LuDownload size={14} />
                    Export team
                </button>
            </div>

            {/* ── Dialog: Search Contacts ── */}
            <Transition show={store.showCreateTeam}>
                <Dialog onClose={() => store.setCreateTeam(false)} className="relative z-50">
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
                    <div className="fixed inset-0 flex items-center justify-center gap-6 p-4">
                        <TransitionChild
                            as={DialogPanel}
                            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <DialogTitle className="font-gabarito text-lg font-bold text-neutral-800">
                                    Search contacts
                                </DialogTitle>
                                <button
                                    onClick={() => store.setCreateTeam(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-custom-blue text-white hover:opacity-90 transition-all"
                                >
                                    <LuX size={15} />
                                </button>
                            </div>

                            <div className="relative mb-4">
                                <LuSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input
                                    placeholder="Search by name or @..."
                                    className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                                />
                            </div>

                            <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                                Type a name or @ to find users
                            </p>

                            <div className="mt-4 pt-4 border-t border-neutral-100">
                                <button
                                    onClick={() => store.setCreateTeam(false)}
                                    className="w-full bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2 rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </TransitionChild>

                        {/* ── Dialog: Statuses ── */}
                        <TransitionChild
                            as={DialogPanel}
                            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <DialogTitle className="font-gabarito text-lg font-bold text-neutral-800">
                                    Statuses
                                </DialogTitle>
                            </div>

                            <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                                Configure your team statuses.
                            </p>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});
