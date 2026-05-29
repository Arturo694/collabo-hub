import { LuMail, LuLock, LuEye, LuEyeOff, LuUser, LuAtSign } from "react-icons/lu";
import { useState } from "react";
import { Link } from "react-router";

export default function Join() {
    const [showPw, setShowPw] = useState(false);

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-5 py-16">
            <div className="border border-neutral-200 rounded-2xl p-8 w-full max-w-md">
                <h2 className="font-gabarito text-2xl font-bold text-custom-blue mb-1">Create an account</h2>
                <p className="font-outfit text-sm text-neutral-500 mb-6">Start collaborating today.</p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">Username</label>
                        <div className="relative">
                            <LuUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type="text" placeholder="yourname" className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                        </div>
                    </div>

                    <div>
                        <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">Email</label>
                        <div className="relative">
                            <LuMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type="email" placeholder="you@example.com" className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                        </div>
                    </div>

                    <div>
                        <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">Password</label>
                        <div className="relative">
                            <LuLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" className="w-full border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                                {showPw ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">Confirm password</label>
                        <div className="relative">
                            <LuLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type={showPw ? "text" : "password"} placeholder="Repeat your password" className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                        </div>
                    </div>

                    <div>
                        <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">How should others mention you?</label>
                        <div className="relative">
                            <LuAtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input type="text" placeholder="@username" className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400" />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-custom-blue hover:opacity-90 text-white font-outfit font-medium px-6 py-2.5 rounded-lg transition-all text-sm">
                        Create account
                    </button>
                </form>

                <p className="font-outfit text-xs text-neutral-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-custom-blue hover:underline font-medium">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
