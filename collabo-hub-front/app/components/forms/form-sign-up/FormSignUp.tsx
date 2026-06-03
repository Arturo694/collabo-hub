import {
    LuMail,
    LuLock,
    LuEye,
    LuEyeOff,
    LuUser,
    LuAtSign
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { ZodError } from "zod";
import { FormSignUpSchema, type FormSignUpData } from "./formSignUpValidation";
import FormSignUpStore from "./formSignUpStore";
import iamSignUp, { ValidationIamSignUp } from "./formSignUpFetch";


const FormSignUpView = observer(({ store }: { store: FormSignUpStore }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        store.setIsLoading(true);

        const data: FormSignUpData = {
            name: store.userName,
            email: store.email,
            password: store.password,
            confirmPassword: store.confirmPassword,
            atSign: store.atSign
        };

        try {
            FormSignUpSchema.parse(data);

            await iamSignUp({
                name: store.userName,
                email: store.email,
                password: store.password,
                atSign: store.atSign
            });

            store.reset();
            navigate("/signin");
        } catch (error) {
            if (error instanceof ZodError) {
                store.setValidationErrors(
                    error.issues.map((err) => err.message)
                );
                return;
            }

            if (error instanceof ValidationIamSignUp) {
                store.setValidationErrors(error.messages);
                return;
            }

            navigate("/error");
        } finally {
            store.setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">
                    Username
                </label>
                <div className="relative">
                    <LuUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        value={store.userName}
                        onChange={(e) => store.setUserName(e.target.value)}
                        placeholder="yourname"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                </div>
            </div>

            <div>
                <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">
                    Email
                </label>
                <div className="relative">
                    <LuMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="email"
                        value={store.email}
                        onChange={(e) => store.setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                </div>
            </div>

            <div>
                <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">
                    Password
                </label>
                <div className="relative">
                    <LuLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type={store.showPassword ? "text" : "password"}
                        value={store.password}
                        onChange={(e) => store.setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />

                    <button
                        type="button"
                        onClick={() => store.setShowPassword(!store.showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                        {store.showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                    </button>
                </div>
            </div>

            <div>
                <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">
                    Confirm password
                </label>
                <div className="relative">
                    <LuLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type={store.showConfirmPassword ? "text" : "password"}
                        value={store.confirmPassword}
                        onChange={(e) => store.setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                </div>
            </div>

            <div>
                <label className="font-outfit text-xs font-medium text-neutral-700 mb-1.5 block">
                    How should others mention you?
                </label>
                <div className="relative">
                    <LuAtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        value={store.atSign}
                        onChange={(e) => store.setAtSign(e.target.value)}
                        placeholder="@username"
                        className="w-full border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-sm font-outfit text-neutral-700 focus:outline-none focus:border-custom-blue transition-colors placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {store.validationErrors.length > 0 && (
                <div>
                    <ul className="list-disc list-inside space-y-1">
                        {store.validationErrors.map((msg, i) => (
                            <li key={i} className="text-xs text-red-600 font-outfit">{msg}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                type="submit"
                disabled={store.isLoading}
                className="w-full bg-custom-blue hover:opacity-90 disabled:opacity-70 text-white font-outfit font-medium px-6 py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                {store.isLoading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating account...</span>
                    </>
                ) : (
                    "Create account"
                )}
            </button>
        </form>
    );
})

export default function FormSignUp() {
    return <FormSignUpView store={new FormSignUpStore()} />
}