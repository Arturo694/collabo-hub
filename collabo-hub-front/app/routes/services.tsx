import {
    LuZap,
    LuUsers,
    LuShield,
    LuGitBranch,
    LuCloud,
    LuTrendingUp
} from "react-icons/lu";
import type { Route } from "./+types/services";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Services — Collabo-Hub" },
        { name: "description", content: "Discover our collaboration and productivity services." },
    ];
}

const services = [
    {
        icon: LuZap,
        title: "Real-time Collaboration",
        desc: "Work together in real-time with instant sync across all devices."
    },
    {
        icon: LuUsers,
        title: "Team Management",
        desc: "Invite members, assign roles, and manage permissions with ease."
    },
    {
        icon: LuShield,
        title: "Enterprise Security",
        desc: "End-to-end encryption, SSO, and compliance-ready infrastructure."
    },
    {
        icon: LuGitBranch,
        title: "Version Control",
        desc: "Built-in versioning for all your projects and documents."
    },
    {
        icon: LuCloud,
        title: "Cloud Sync",
        desc: "Automatic backups and seamless sync across all your devices."
    },
    {
        icon: LuTrendingUp,
        title: "Analytics & Insights",
        desc: "Track progress, measure productivity, and make data-driven decisions."
    },
];

export default function Services() {
    return (
        <div className="max-w-5xl mx-auto px-5 py-16">
            <div className="text-center mb-12">
                <h1 className="font-gabarito text-5xl md:text-6xl font-bold text-custom-blue">
                    Everything your team needs
                </h1>
                <p className="font-outfit text-neutral-500 mt-4 max-w-lg mx-auto leading-relaxed">
                    From real-time collaboration to enterprise-grade security — we've got you covered.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {services.map((s) => (
                    <div key={s.title} className="border border-neutral-200 rounded-2xl p-6 hover:border-custom-blue/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-custom-blue/10 flex items-center justify-center text-custom-blue mb-4">
                            <s.icon size={20} />
                        </div>
                        <h3 className="font-outfit font-semibold text-neutral-800 mb-1">{s.title}</h3>
                        <p className="text-sm text-neutral-500 font-outfit leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
