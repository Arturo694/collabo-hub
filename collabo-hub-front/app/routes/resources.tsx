import {
    LuBookOpen,
    LuCode,
    LuVideo,
    LuFileText,
    LuArrowRight,
    LuSearch,
    LuUsers,
    LuShield,
    LuGitBranch
} from "react-icons/lu";
import { Link } from "react-router";
import type { Route } from "./+types/resources";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Resources — Collabo-Hub" },
        { name: "description", content: "Guides, tutorials, and documentation to get the most out of Collabo-Hub." },
    ];
}

const guides = [
    {
        icon: LuBookOpen,
        title: "Getting Started Guide",
        desc: "Learn the basics and set up your first project in under 5 minutes.",
        read: "5 min read"
    },
    {
        icon: LuUsers,
        title: "Team Collaboration Best Practices",
        desc: "Tips and workflows to keep your team aligned and productive.",
        read: "8 min read"
    },
    {
        icon: LuShield,
        title: "Security & Permissions",
        desc: "Understand roles, access control, and how to keep your data safe.",
        read: "6 min read"
    },
    {
        icon: LuGitBranch,
        title: "Version Control Workflows",
        desc: "Master branching strategies and conflict resolution.",
        read: "10 min read"
    },
    {
        icon: LuCode,
        title: "API Reference",
        desc: "Integrate Collabo-Hub with your existing tools via our REST API.",
        read: "12 min read"
    },
    {
        icon: LuVideo,
        title: "Video Tutorials",
        desc: "Step-by-step walkthroughs covering every feature.",
        read: "15 min watch"
    },
];

const categories = [
    {
        title: "Documentation",
        icon: LuFileText,
        items: ["Installation Guide", "Configuration", "CLI Reference", "FAQ"]
    },
    {
        title: "Integrations",
        icon: LuCode,
        items: ["Slack", "GitHub", "GitLab", "Zapier"]
    },
    {
        title: "Support",
        icon: LuBookOpen,
        items: ["Contact Support", "Community Forum", "Feature Requests", "Status Page"]
    },
];

export default function Resources() {
    return (
        <div className="max-w-5xl mx-auto px-5 py-16">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="font-gabarito text-5xl md:text-6xl font-bold text-custom-blue">
                    Resources & Guides
                </h1>
                <p className="font-outfit text-neutral-500 mt-4 max-w-lg mx-auto leading-relaxed">
                    Everything you need to ship faster, from docs to deep dives.
                </p>
                <div className="relative max-w-md mx-auto mt-8">
                    <LuSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input type="text" placeholder="Search resources..." className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                </div>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                {guides.map((g) => (
                    <div key={g.title} className="border border-neutral-200 rounded-2xl p-6 hover:border-custom-blue/30 hover:shadow-sm transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-custom-blue/10 flex items-center justify-center text-custom-blue mb-4">
                            <g.icon size={20} />
                        </div>
                        <h3 className="font-outfit font-semibold text-neutral-800 mb-1.5">{g.title}</h3>
                        <p className="text-sm text-neutral-500 font-outfit leading-relaxed mb-3">{g.desc}</p>
                        <span className="text-xs text-custom-blue font-outfit font-medium">{g.read}</span>
                    </div>
                ))}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <div key={cat.title}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-custom-blue/10 flex items-center justify-center text-custom-blue">
                                <cat.icon size={16} />
                            </div>
                            <h3 className="font-outfit font-semibold text-neutral-800 text-sm">{cat.title}</h3>
                        </div>
                        <ul className="space-y-3">
                            {cat.items.map((item) => (
                                <li key={item}>
                                    <Link to="/resources" className="flex items-center justify-between text-sm text-neutral-500 hover:text-custom-blue font-outfit transition-colors group">
                                        {item}
                                        <LuArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
