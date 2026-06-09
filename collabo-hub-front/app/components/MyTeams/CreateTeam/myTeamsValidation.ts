import * as z from "zod";

export const ArmTeamSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const SearchContactsSchema = z.object({}).optional();

export const StatusesSchema = z.object({}).optional();
