import {z} from "zod";

export const updateImageRequestSchema = z.object({
    contentType: z.string(),
    dataBase64: z.string(),
}).strict();
export type UpdateImageRequest = z.infer<typeof updateImageRequestSchema>;
