import {z} from "zod";

export const emptyObjectSchema = z.object({}).strict();
export type EmptyObject = Record<string | number, never>;
