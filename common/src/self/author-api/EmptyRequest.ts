import {z} from "zod";

export const emptyRequestSchema = z.object({
}).strict();
export type EmptyRequest = z.infer<typeof emptyRequestSchema>;
