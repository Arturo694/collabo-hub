import {
    LuShield,
    LuUsers,
    LuGlobe,
    LuHeadphones,
    LuLock,
    LuSlidersVertical,
    LuCheck
} from "react-icons/lu";
import { Link } from "react-router";
import { ROUTES } from "~/lib/routes";
import type { Route } from "./+types/enterprise";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Enterprise — Collabo-Hub" },
        { name: "description", content: "Enterprise-grade collaboration platform for large organizations." },
    ];
}

const features = [
    {
        icon: LuShield,
        title: "SSO & SAML",
        desc: "Single sign-on integration with Okta, Azure AD, Google Workspace, and more."
    },
    {
        icon: LuLock,
        title: "Advanced Security",
        desc: "End-to-end encryption, audit logs, and SOC 2 compliance ready."
    },
    {
        icon: LuUsers,
        title: "Unlimited Seats",
        desc: "No per-user pricing. Your entire organization can collaborate freely."
    },
    {
        icon: LuGlobe,
        title: "Global Deployments",
        desc: "Multi-region availability with data residency controls."
    },
    {
        icon: LuSlidersVertical,
        title: "Custom Workflows",
        desc: "Tailored approval chains, automations, and integrations."
    },
    {
        icon: LuHeadphones,
        title: "Dedicated Support",
        desc: "24/7 priority support with a dedicated account manager."
    },
];

const perks = [
    "Unlimited projects & storage",
    "Custom branding & white-label",
    "Advanced analytics & reporting",
    "API rate limit: 10,000 req/min",
    "99.99% uptime SLA",
    "On-premise deployment option",
    "Quarterly business reviews",
    "Employee onboarding & training",
];

export default function Enterprise() {
    return (
        <div className="max-w-5xl mx-auto px-5 py-16">
            <div className="text-center mb-16">
                <h1 className="font-gabarito text-5xl md:text-6xl font-bold text-custom-blue">
                    Built for the enterprise
                </h1>
                <p className="font-outfit text-neutral-500 mt-4 max-w-lg mx-auto leading-relaxed">
                    Security, scale, and support for organizations that need more than a tool.
                </p>
                <div className="flex items-center justify-center gap-3 mt-8">
                    <Link to={ROUTES.SIGNUP} className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium px-6 py-3 rounded-lg transition-all text-sm">
                        Contact sales
                    </Link>
                    <Link to={ROUTES.PRICING} className="border border-neutral-300 hover:border-custom-blue text-neutral-700 hover:text-custom-blue font-outfit font-medium px-6 py-3 rounded-lg transition-all text-sm">
                        View pricing
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                {features.map((f) => (
                    <div key={f.title} className="border border-neutral-200 rounded-2xl p-6 hover:border-custom-blue/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-custom-blue/10 flex items-center justify-center text-custom-blue mb-4">
                            <f.icon size={20} />
                        </div>
                        <h3 className="font-outfit font-semibold text-neutral-800 mb-1">{f.title}</h3>
                        <p className="text-sm text-neutral-500 font-outfit leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>

            <div className="border border-neutral-200 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="font-gabarito text-3xl font-bold text-custom-blue mb-4">
                            Everything in Pro, plus enterprise extras
                        </h2>
                        <p className="font-outfit text-sm text-neutral-500 mb-6 leading-relaxed">
                            Get all the power of the Pro plan with additional security, control, and support your organization needs.
                        </p>
                        <Link to={ROUTES.SIGNUP} className="bg-custom-blue hover:opacity-90 text-white font-outfit font-medium px-6 py-3 rounded-lg transition-all text-sm inline-block">
                            Talk to our team
                        </Link>
                    </div>
                    <ul className="space-y-4">
                        {perks.map((p) => (
                            <li key={p} className="flex items-center gap-3 text-sm text-neutral-700 font-outfit">
                                <div className="w-6 h-6 rounded-full bg-custom-blue/10 flex items-center justify-center shrink-0">
                                    <LuCheck size={14} className="text-custom-blue" />
                                </div>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
