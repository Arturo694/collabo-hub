import { Link } from "react-router";
import { ROUTES } from "../lib/routes";

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="max-w-5xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-gabarito font-bold text-custom-blue text-lg mb-3">Collabo-Hub</h4>
                    <p className="text-sm text-neutral-500 font-outfit leading-relaxed">
                        The modern collaboration platform for teams who ship.
                    </p>
                </div>
                <div>
                    <h4 className="font-outfit font-semibold text-neutral-800 text-sm mb-3">Product</h4>
                    <ul className="space-y-2 text-sm text-neutral-500 font-outfit">
                        <li><Link to={ROUTES.SERVICES} className="hover:text-custom-blue transition-colors">Services</Link></li>
                        <li><Link to={ROUTES.PRICING} className="hover:text-custom-blue transition-colors">Pricing</Link></li>
                        <li><Link to={ROUTES.ENTERPRISE} className="hover:text-custom-blue transition-colors">Enterprise</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-outfit font-semibold text-neutral-800 text-sm mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm text-neutral-500 font-outfit">
                        <li><Link to={ROUTES.RESOURCES} className="hover:text-custom-blue transition-colors">Documentation</Link></li>
                        <li><Link to={ROUTES.RESOURCES} className="hover:text-custom-blue transition-colors">Blog</Link></li>
                        <li><Link to={ROUTES.RESOURCES} className="hover:text-custom-blue transition-colors">Support</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-outfit font-semibold text-neutral-800 text-sm mb-3">Company</h4>
                    <ul className="space-y-2 text-sm text-neutral-500 font-outfit">
                        <li><Link to={ROUTES.ABOUT} className="hover:text-custom-blue transition-colors">About</Link></li>
                        <li><Link to={ROUTES.PRIVACY} className="hover:text-custom-blue transition-colors">Privacy</Link></li>
                        <li><Link to={ROUTES.TERMS} className="hover:text-custom-blue transition-colors">Terms</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 font-outfit">
                    <span>&copy; {new Date().getFullYear()} Collabo-Hub. All rights reserved.</span>
                    <span>Built with modern tech.</span>
                </div>
            </div>
        </footer>
    );
}