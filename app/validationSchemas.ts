import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "An Issue Title is required.").max(255),
    description: z.string().min(1, "An Issue Description is required."),
});
