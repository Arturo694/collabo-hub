import { useState } from "react";
import {
    LuSearch,
    LuPhone,
    LuMail,
    LuX,
    LuPin,
    LuMessageSquare,
    LuPlus,
    LuAtSign,
    LuCalendarDays,
    LuCircleUser,
} from "react-icons/lu";

const contacts = [
    { id: 1, name: "Dad", phone: "+1 (484) 436 50 49", email: "adams_p@gmail.com", atSign: "@dad", joined: "Jan 2024", pinned: true },
    { id: 2, name: "Mom", phone: "+1 (484) 708 82 76", email: "brenda_adams88@hotmail.com", atSign: "@mom", joined: "Jan 2024", pinned: true },
    { id: 3, name: "Anna", phone: "+1 (484) 293 88 56", email: "ana_ritchie@hotmail.com", atSign: "@anna", joined: "Mar 2024" },
    { id: 4, name: "Bobby Crown", phone: "+1 (484) 288 60 28", email: "crown2919@hotmail.com", atSign: "@bobby", joined: "Apr 2024" },
    { id: 5, name: "Brandon", phone: "+1 (484) 995 84 37", email: "bd88@yahoo.com", atSign: "@brandon", joined: "May 2024" },
    { id: 6, name: "David", phone: "+1 (484) 322 22 32", email: "dave_d@hotmail.com", atSign: "@david", joined: "Jun 2024" },
    { id: 7, name: "Diana", phone: "+1 (484) 812 32 01", email: "p1_diana@gmail.com", atSign: "@diana", joined: "Jul 2024" },
    { id: 8, name: "Gino", phone: "+1 (484) 381 44 56", email: "ginosear@hotmail.com", atSign: "@gino", joined: "Aug 2024" },
    { id: 9, name: "Jerry", phone: "+1 (484) 132 61 42", email: "jerryco@concretolia.com", atSign: "@jerry", joined: "Sep 2024" },
    { id: 10, name: "Jeffrey Macejkovic", phone: "+1 (484) 578 90 97", email: "macejkovlc@gmail.com", atSign: "@jeff", joined: "Oct 2024" },
];

const AVATAR_COLORS = ["bg-custom-blue", "bg-neutral-600", "bg-neutral-500", "bg-neutral-400"];

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
    const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
    return (
        <div className={`w-${size} h-${size} rounded-full ${color} flex items-center justify-center text-white font-semibold text-xs shrink-0`}>
            {initials}
        </div>
    );
}

function highlightText(text: string, query: string) {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? (
            <span key={i} className="bg-custom-blue/15 text-custom-blue font-medium">{part}</span>
        ) : (
            part
        )
    );
}

export default function Contacts() {
    const [search, setSearch] = useState("");

    const filtered = contacts.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.phone.includes(search) ||
            c.atSign.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    return (
        <div className="w-full min-h-screen p-10 bg-white font-outfit">
            <div className="max-w-3xl mx-auto">
                {/* ── HEADER ── */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-gabarito text-3xl font-bold text-neutral-800 tracking-tight">
                            Contacts
                        </h1>
                        <p className="font-outfit text-sm text-neutral-500 mt-1">
                            Manage your contacts and stay connected with your team.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-outfit font-medium text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2">
                            <LuPlus size={16} />
                            Invite to team
                        </button>
                        <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-outfit font-medium text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2">
                            <LuMessageSquare size={16} />
                            Create task
                        </button>
                        <button className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium text-sm px-5 py-2.5 rounded-lg transition-all flex items-center gap-2">
                            <LuPlus size={16} />
                            Add contact
                        </button>
                    </div>
                </div>

                {/* ── SEARCH ── */}
                <div className="flex items-center gap-2 px-4 h-[42px] bg-neutral-50 rounded-xl border border-neutral-200 focus-within:border-custom-blue/40 transition-colors mb-5">
                    <LuSearch size={15} className={`shrink-0 transition-colors ${search ? "text-custom-blue" : "text-neutral-400"}`} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search contacts..."
                        className="bg-transparent border-none text-neutral-600 text-[13px] w-full outline-none placeholder:text-neutral-400"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                            <LuX size={14} />
                        </button>
                    )}
                </div>

                {/* ── CONTACT ROWS ── */}
                <div className="flex flex-col gap-1">
                    {filtered.map((c) => (
                        <ContactRow key={c.id} contact={c} search={search} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
                            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                                <LuCircleUser size={32} className="text-neutral-300" />
                            </div>
                            <p className="text-[14px] font-outfit font-medium text-neutral-500 mb-1">No contacts found</p>
                            <p className="text-[12px] font-outfit text-neutral-400">Try a different search</p>
                        </div>
                    )}
                </div>

                {/* ── FOOTER ── */}
                <div className="mt-5 pt-3 border-t border-neutral-100">
                    <p className="font-outfit text-[11px] text-neutral-400">
                        {filtered.length} of {contacts.length} contacts
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Contact Row ── */
function ContactRow({ contact, search }: { contact: any; search: string }) {
    const online = contact.id % 3 !== 0;
    return (
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer">
            {/* Avatar */}
            <div className="relative">
                <Avatar name={contact.name} size={10} />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${online ? "bg-emerald-500" : "bg-neutral-300"}`} />
            </div>

            {/* Name + atSign */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="font-outfit text-[13px] font-semibold text-neutral-800 truncate">
                        {highlightText(contact.name, search)}
                    </p>
                    {contact.pinned && <LuPin size={10} className="text-neutral-300 shrink-0" />}
                </div>
                <p className="font-outfit text-[11px] text-neutral-500 truncate flex items-center gap-1">
                    <LuAtSign size={10} className="text-neutral-400" />
                    {highlightText(contact.atSign, search)}
                </p>
            </div>

            {/* Email */}
            <div className="flex-1 min-w-0 hidden sm:block">
                <p className="font-outfit text-[12px] text-neutral-600 truncate">
                    {highlightText(contact.email, search)}
                </p>
            </div>

            {/* Phone */}
            <div className="hidden md:block shrink-0">
                <p className="font-outfit text-[11px] text-neutral-400">{contact.phone}</p>
            </div>

            {/* Joined */}
            <div className="flex items-center gap-1 shrink-0">
                <LuCalendarDays size={11} className="text-neutral-300" />
                <p className="font-outfit text-[10px] text-neutral-400">{contact.joined}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-custom-blue/10 hover:text-custom-blue transition-all">
                    <LuPhone size={13} />
                </button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-custom-blue/10 hover:text-custom-blue transition-all">
                    <LuMail size={13} />
                </button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-custom-blue/10 hover:text-custom-blue transition-all">
                    <LuMessageSquare size={13} />
                </button>
            </div>
        </div>
    );
}
