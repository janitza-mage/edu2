import { z, ZodType, ZodTypeDef } from "zod";

export function zodEnum<T extends string>(elements: readonly T[]): ZodType<T, ZodTypeDef, T> {
  return z.enum(elements as unknown as [string, ...string[]]) as unknown as ZodType<T, ZodTypeDef, T>;
}
