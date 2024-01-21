import {z} from "zod";

export const updateCourseHeaderDataRequestSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
}).strict();
export type UpdateCourseHeaderDataRequest = z.infer<typeof updateCourseHeaderDataRequestSchema>;
