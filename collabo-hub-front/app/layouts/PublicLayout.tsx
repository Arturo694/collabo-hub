import { Outlet, Link } from "react-router";
import { LuLayers, LuBookOpen, LuDollarSign, LuBuilding2, LuLogIn } from "react-icons/lu";

export default function PublicLayout() {
    return (
        <main>
            <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
                <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-16">
                    <Link to="/" className="font-gabarito font-bold text-2xl text-custom-blue tracking-tight">
                        Collabo-Hub
                    </Link>
                    <ul className="font-outfit flex items-center justify-end gap-8 text-sm font-medium text-neutral-600">
                        <li>
                            <Link to="/services" className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                                <LuLayers size={16} />
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/resources" className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                                <LuBookOpen size={16} />
                                Resources
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                                <LuDollarSign size={16} />
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/enterprise" className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                                <LuBuilding2 size={16} />
                                Enterprise
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" className="hover:text-custom-blue transition-colors inline-flex items-center gap-1.5">
                                <LuLogIn size={16} />
                                Sign in
                            </Link>
                        </li>
                        <li>
                            <Link to="/join" className="bg-custom-blue hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all font-medium">
                                Join for free
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
            <footer className="border-t border-neutral-200 bg-white">
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
                            <li><Link to="/services" className="hover:text-custom-blue transition-colors">Services</Link></li>
                            <li><Link to="/pricing" className="hover:text-custom-blue transition-colors">Pricing</Link></li>
                            <li><Link to="/enterprise" className="hover:text-custom-blue transition-colors">Enterprise</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-outfit font-semibold text-neutral-800 text-sm mb-3">Resources</h4>
                        <ul className="space-y-2 text-sm text-neutral-500 font-outfit">
                            <li><Link to="/resources" className="hover:text-custom-blue transition-colors">Documentation</Link></li>
                            <li><Link to="/resources" className="hover:text-custom-blue transition-colors">Blog</Link></li>
                            <li><Link to="/resources" className="hover:text-custom-blue transition-colors">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-outfit font-semibold text-neutral-800 text-sm mb-3">Company</h4>
                        <ul className="space-y-2 text-sm text-neutral-500 font-outfit">
                            <li><Link to="/about" className="hover:text-custom-blue transition-colors">About</Link></li>
                            <li><Link to="/privacy" className="hover:text-custom-blue transition-colors">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-custom-blue transition-colors">Terms</Link></li>
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
        </main>
    );
}