import { z, ZodError } from "zod";
import { FinishRequest } from "./FinishRequest";
import { RequestCycleBase } from "./RequestCycleBase";

export async function validateRequestBodyZod<SCHEMA extends z.ZodTypeAny>(
  requestCycle: RequestCycleBase,
  schema: SCHEMA,
): Promise<z.infer<SCHEMA>> {
  try {
    return await schema.parseAsync(requestCycle.request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw FinishRequest.badRequest("request body validation failed", { errors: error.issues });
    } else {
      throw error;
    }
  }
}
