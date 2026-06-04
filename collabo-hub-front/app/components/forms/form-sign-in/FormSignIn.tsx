import { useNavigate } from "react-router";
import {
    LuMail,
    LuLock,
    LuEye,
    LuEyeOff,
    LuShield
} from "react-icons/lu";
import { observer } from "mobx-react-lite";
import FormSignInStore from "./formSignInStore";
import { iamSignIn, ApiError } from "../../../lib/api";
import { ROUTES } from '../../../lib/routes'

const FormSignInView = observer(({ store }: { store: FormSignInStore }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        store.setIsLoading(true);

        try {
            await iamSignIn({
                email: store.email,
                password: store.password,
            });

            store.reset();
            navigate(ROUTES.AUTH_DASHBOARD);
        } catch (error) {
            if (error instanceof ApiError) {
                store.setValidationErrors(error.message);
                return;
            }

            navigate(ROUTES.ERROR);
        } finally {
            store.setIsLoading(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label className="font-outfit text-sm font-medium text-neutral-700 mb-2 block">
                    Email
                </label>
                <div className="relative">
                    <LuMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="email"
                        value={store.email}
                        onChange={(e) => store.setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                </div>
            </div>

            <div className="mb-14">
                <div className="flex items-center justify-between mb-2">
                    <label className="font-outfit text-sm font-medium text-neutral-700">
                        Password
                    </label>
                    <button type="button" className="font-outfit text-xs text-custom-blue hover:underline">
                        Forgot password?
                    </button>
                </div>
                <div className="relative">
                    <LuLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type={store.showPassword ? "text" : "password"}
                        value={store.password}
                        onChange={(e) => store.setPassword(e.target.value)}
                        placeholder="Your password"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                    <button
                        type="button"
                        onClick={() => store.setShowPassword(!store.showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                        {store.showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={store.isLoading}
                className="w-full bg-custom-blue hover:opacity-90 disabled:opacity-70 text-white font-outfit font-medium px-6 py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
            >
                {store.isLoading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Signing in...</span>
                    </>
                ) : (
                    "Sign in"
                )}
            </button>

            {store.validationErrors && (
                <p className="text-xs text-red-600 font-outfit text-center">{store.validationErrors}</p>
            )}

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-custom-blue/10 flex items-center justify-center text-custom-blue shrink-0 mt-0.5">
                    <LuShield size={16} />
                </div>
                <div>
                    <p className="font-outfit text-xs font-semibold text-neutral-700">Your data is protected</p>
                    <p className="font-outfit text-xs text-neutral-500 mt-0.5 leading-relaxed">
                        Secured with end-to-end encryption. We never share your credentials with third parties.
                    </p>
                </div>
            </div>
        </form>
    );
})


export default function FormSignIn() {
    return <FormSignInView store={new FormSignInStore()} />
}