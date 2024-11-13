import {exerciseSheetSchema} from "./Exercise";
import {zodEnum} from "../util/zod/zodEnum";
import {z} from "zod";

export const exerciseDefinitionTypeSchema = zodEnum(["explicit", "script"]);
export type ExerciseDefinitionType = z.infer<typeof exerciseDefinitionTypeSchema>;

export const exerciseDefinitionBaseSchema = z.object({
    type: exerciseDefinitionTypeSchema,
}).strict();
export type ExerciseDefinitionBase = z.infer<typeof exerciseDefinitionBaseSchema>;

export const exerciseDefinitionExplicitSchema = exerciseDefinitionBaseSchema.extend({
    type: z.literal("explicit"),
    exercises: exerciseSheetSchema,
}).strict();
export type ExerciseDefinitionExplicit = z.infer<typeof exerciseDefinitionExplicitSchema>;

export const exerciseDefinitionScriptSchema = exerciseDefinitionBaseSchema.extend({
    type: z.literal("script"),
    // the script itself is kept in the separate exerciseScript field, separate from the exerciseDefinition
}).strict();
export type ExerciseDefinitionScript = z.infer<typeof exerciseDefinitionScriptSchema>;

export const exerciseDefinitionSchema = z.discriminatedUnion("type", [
    exerciseDefinitionExplicitSchema,
    exerciseDefinitionScriptSchema,
]);
export type ExerciseDefinition = z.infer<typeof exerciseDefinitionSchema>;
