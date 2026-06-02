import * as z from "zod";

export const FormSignUpSchema = z.object({
    name:
        z.string()
            .min(3, "Username must be at least 3 characters long")
            .max(20, "Username must be at most 20 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email:
        z.email("Invalid email address"),
    password:
        z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[a-zA-Z]/, "Password must contain at least one letter")
            .regex(/\d/, "Password must contain at least one number"),
    confirmPassword:
        z.string(),
    atSign:
        z.string()
            .startsWith("@", "At sign must start with @")
            .min(5, "At sign must be at least 5 characters long")
            .max(20, "At sign must be at most 20 characters long")
            .regex(/^\S+$/, "At sign must not contain spaces")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"
});

export type FormSignUpData = z.infer<typeof FormSignUpSchema>;