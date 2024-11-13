import {z} from "zod";

export const uploadImageRequestSchema = z.object({
    contentType: z.string(),
    dataBase64: z.string(),
}).strict();
export type UploadImageRequest = z.infer<typeof uploadImageRequestSchema>;
