import { ZodTypeDef } from "zod/lib/types";
import { z } from "zod";

export type SchemaWithOutput<T> = z.Schema<T, ZodTypeDef, any>;
