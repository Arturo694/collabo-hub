import * as z from "zod";

export const FormSignInSchema = z.object({
    email:
        z.email("Invalid email address"),
    password:
        z.string()
            .nonempty("Password is required"),
});

export type FormSignInData = z.infer<typeof FormSignInSchema>;
