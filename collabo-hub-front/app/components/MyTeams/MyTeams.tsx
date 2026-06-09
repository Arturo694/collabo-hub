import { LuSearch, LuX, LuPlus, LuDownload, LuCheck, LuArrowLeft } from "react-icons/lu";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { observer } from "mobx-react-lite";
import type { TeamStore } from "./teamStore";
import { ArmTeamSchema, SearchContactsSchema } from "./myTeamsValidation";
import { contactsFindAll } from "../../lib/api";

export const MyTeamsView = observer(({ store }: { store: TeamStore }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            store.addTag();
        }
    };

    const handleContinueFromArm = async () => {
        const result = ArmTeamSchema.safeParse({ name: store.teamName });
        if (!result.success) {
            store.setError("Completa los campos");
            return;
        }
        try {
            const { contacts } = await contactsFindAll("");
            store.setAvailableContacts(contacts);
        } catch {
            // silently fail, show empty list
        }
        store.continueToSearchContacts();
    };

    const handleContinueFromSearch = () => {
        if (store.selectedMembers.length === 0) {
            store.setError("Completa los campos");
            return;
        }
        store.continueToStatuses();
    };

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

            {/* ── Step 1: Arm your team ── */}
            <Transition show={store.showArmTeam}>
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
                    <div className="fixed inset-0 flex items-center justify-center p-4">
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
                                    Arm your team
                                </DialogTitle>
                                <button
                                    onClick={() => store.setCreateTeam(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-custom-blue text-white hover:opacity-90 transition-all"
                                >
                                    <LuX size={15} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="font-outfit text-[13px] font-medium text-neutral-700 mb-1.5 block">
                                        Name
                                    </label>
                                    <input
                                        value={store.teamName}
                                        onChange={(e) => store.setTeamName(e.target.value)}
                                        placeholder="Team name"
                                        className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                                    />
                                </div>

                                <div>
                                    <label className="font-outfit text-[13px] font-medium text-neutral-700 mb-1.5 block">
                                        Description
                                    </label>
                                    <textarea
                                        value={store.teamDescription}
                                        onChange={(e) => store.setTeamDescription(e.target.value)}
                                        placeholder="Describe your team..."
                                        rows={3}
                                        className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="font-outfit text-[13px] font-medium text-neutral-700 mb-1.5 block">
                                        Tags
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            value={store.currentTag}
                                            onChange={(e) => store.setCurrentTag(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Write a tag..."
                                            className="flex-1 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                                        />
                                        <button
                                            onClick={() => store.addTag()}
                                            className="bg-custom-blue hover:opacity-90 text-white rounded-lg transition-all shrink-0 w-9 h-9 flex items-center justify-center"
                                        >
                                            <LuPlus size={16} />
                                        </button>
                                    </div>
                                    {store.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {store.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1.5 bg-custom-blue/10 text-custom-blue font-outfit text-[12px] px-2.5 py-1 rounded-full"
                                                >
                                                    {tag}
                                                    <button
                                                        onClick={() => store.removeTag(i)}
                                                        className="hover:opacity-70"
                                                    >
                                                        <LuX size={12} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {store.error && (
                                <div className="mt-6 mb-3 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-outfit text-[13px]">
                                    {store.error}
                                </div>
                            )}

                            <button
                                onClick={handleContinueFromArm}
                                className="w-full bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2.5 my-4 rounded-lg transition-all"
                            >
                                Continue
                            </button>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            {/* ── Step 2: Search contacts ── */}
            <Transition show={store.showSearchContacts}>
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
                    <div className="fixed inset-0 flex items-center justify-center p-4">
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
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => store.backToArmTeam()}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                                    >
                                        <LuArrowLeft size={16} />
                                    </button>
                                    <DialogTitle className="font-gabarito text-lg font-bold text-neutral-800">
                                        Search contacts
                                    </DialogTitle>
                                </div>
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
                                    value={store.contactSearch}
                                    onChange={(e) => store.setContactSearch(e.target.value)}
                                    placeholder="Search by name or @..."
                                    className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                                {store.filteredContacts.map((c) => {
                                    const isSelected = store.selectedMembers.includes(c.id)
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => store.toggleMember(c.id)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all text-left w-full"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-custom-blue flex items-center justify-center text-white font-semibold text-xs shrink-0">
                                                {c.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-outfit text-[13px] font-semibold text-neutral-800 truncate">
                                                    {c.name}
                                                </p>
                                                <p className="font-outfit text-[11px] text-neutral-500 truncate">
                                                    {c.atSign}
                                                </p>
                                            </div>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${isSelected ? "bg-custom-blue border-custom-blue" : "border-neutral-300"}`}>
                                                {isSelected && <LuCheck size={12} className="text-white" />}
                                            </div>
                                        </button>
                                    )
                                })}

                                {store.filteredContacts.length === 0 && (
                                    <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                                        {store.contactSearch ? "No contacts found" : "No contacts available"}
                                    </p>
                                )}
                            </div>

                            {store.selectedMembers.length > 0 && (
                                <p className="font-outfit text-[12px] text-neutral-500 mt-3">
                                    {store.selectedMembers.length} member{store.selectedMembers.length !== 1 ? "s" : ""} selected
                                </p>
                            )}

                            {store.error && (
                                <div className="mt-3 mb-3 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-outfit text-[13px]">
                                    {store.error}
                                </div>
                            )}

                            <button
                                onClick={handleContinueFromSearch}
                                className="w-full bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2.5 rounded-lg transition-all mt-4"
                            >
                                Continue
                            </button>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            {/* ── Step 3: Statuses ── */}
            <Transition show={store.showStatuses}>
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
                    <div className="fixed inset-0 flex items-center justify-center p-4">
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
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => store.backToSearchContacts()}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-all"
                                    >
                                        <LuArrowLeft size={16} />
                                    </button>
                                    <DialogTitle className="font-gabarito text-lg font-bold text-neutral-800">
                                        Statuses
                                    </DialogTitle>
                                </div>
                                <button
                                    onClick={() => store.setCreateTeam(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-custom-blue text-white hover:opacity-90 transition-all"
                                >
                                    <LuX size={15} />
                                </button>
                            </div>

                            <p className="font-outfit text-[13px] text-neutral-400 text-center py-8">
                                Configure your team statuses.
                            </p>

                            <button
                                onClick={() => store.setCreateTeam(false)}
                                className="w-full bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-[13px] px-4 py-2.5 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});
