import {z} from "zod";

export const updateBackendUnitRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    contentUrl: z.string(),
    exerciseDefinition: z.string(),
    exerciseScript: z.string(),
}).strict();
export type UpdateBackendUnitRequest = z.infer<typeof updateBackendUnitRequestSchema>;
