import { LuCheck, LuZap, LuBuilding2, LuRocket } from "react-icons/lu";
import { Link } from "react-router";
import type { Route } from "./+types/pricing";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pricing — Collabo-Hub" },
        { name: "description", content: "Simple, transparent pricing for teams of all sizes." },
    ];
}

const plans = [
    {
        name: "Starter",
        icon: LuZap,
        price: 0,
        desc: "Perfect for small teams getting started.",
        features: ["Up to 5 team members", "10 projects", "Basic analytics", "Community support", "1 GB storage"],
    },
    {
        name: "Pro",
        icon: LuRocket,
        price: 29,
        desc: "For growing teams that need more power.",
        popular: true,
        features: ["Up to 25 team members", "Unlimited projects", "Advanced analytics", "Priority support", "50 GB storage", "Custom roles", "API access"],
    },
    {
        name: "Enterprise",
        icon: LuBuilding2,
        price: 99,
        desc: "For large organizations with advanced needs.",
        features: ["Unlimited team members", "Unlimited projects", "Enterprise analytics", "Dedicated support", "500 GB storage", "Custom roles & SSO", "API access", "Audit logs", "SLA guarantee"],
    },
];

const faqs = [
    { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately." },
    { q: "Is there a free trial?", a: "The Starter plan is free forever. Pro and Enterprise come with a 14-day free trial." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no hidden fees. Cancel with one click." },
];

export default function Pricing() {
    return (
        <div className="max-w-5xl mx-auto px-5 py-16">
            <div className="text-center mb-12">
                <h1 className="font-gabarito text-5xl md:text-6xl font-bold text-custom-blue">
                    Simple, transparent pricing
                </h1>
                <p className="font-outfit text-neutral-500 mt-4 max-w-lg mx-auto leading-relaxed">
                    No hidden fees. No surprises. Start for free and scale as you grow.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
                {plans.map((plan) => (
                    <div key={plan.name} className={`relative border rounded-2xl p-6 transition-all ${plan.popular ? "border-custom-blue shadow-lg shadow-custom-blue/5" : "border-neutral-200"}`}>
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-custom-blue text-white text-xs font-outfit font-medium px-4 py-1 rounded-full">
                                Most popular
                            </div>
                        )}
                        <div className="w-10 h-10 rounded-xl bg-custom-blue/10 flex items-center justify-center text-custom-blue mb-4">
                            <plan.icon size={20} />
                        </div>
                        <h3 className="font-gabarito text-xl font-bold text-neutral-800">{plan.name}</h3>
                        <p className="font-outfit text-sm text-neutral-500 mt-1 mb-4">{plan.desc}</p>
                        <div className="mb-6">
                            <span className="font-gabarito text-4xl font-bold text-custom-blue">${plan.price}</span>
                            <span className="font-outfit text-sm text-neutral-400 ml-1">/mo</span>
                        </div>
                        <Link to="/join" className={`block text-center font-outfit font-medium text-sm py-2.5 rounded-lg transition-all mb-6 ${plan.popular ? "bg-custom-blue text-white hover:opacity-90" : "border border-neutral-300 text-neutral-700 hover:border-custom-blue hover:text-custom-blue"}`}>
                            {plan.price === 0 ? "Get started free" : "Start free trial"}
                        </Link>
                        <ul className="space-y-3">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-sm text-neutral-600 font-outfit">
                                    <LuCheck size={14} className="text-custom-blue shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto">
                <h2 className="font-gabarito text-2xl font-bold text-custom-blue text-center mb-8">Frequently asked questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.q} className="border border-neutral-200 rounded-xl p-4">
                            <p className="font-outfit font-medium text-sm text-neutral-800 mb-2">{faq.q}</p>
                            <p className="text-sm text-neutral-500 font-outfit leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
