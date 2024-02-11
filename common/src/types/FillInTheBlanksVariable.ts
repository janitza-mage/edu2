import {zodEnum} from "../util/zod/zodEnum";
import {z} from "zod";
import {exerciseBaseSchema} from "./Exercise";

// --------------------------------------------------------------------------------------------------------------------
// core types
// --------------------------------------------------------------------------------------------------------------------

export const fillInTheBlanksVariableTypeSchema = zodEnum(["text", "choice"]);
export type FillInTheBlanksVariableType = z.infer<typeof fillInTheBlanksVariableTypeSchema>;

export const fillInTheBlanksVariableBaseSchema = z.object({
    name: z.string(),
    type: fillInTheBlanksVariableTypeSchema,
}).strict();
export type FillInTheBlanksVariableBase = z.infer<typeof fillInTheBlanksVariableBaseSchema>;

// --------------------------------------------------------------------------------------------------------------------
// different variable types
// --------------------------------------------------------------------------------------------------------------------

export const fillInTheBlanksTextSubtypeSchema = zodEnum(["text", "number"]);

export const fillInTheBlanksTextVariableSchema = fillInTheBlanksVariableBaseSchema.extend({
    type: z.literal("text"),
    expected: z.string(),
    subtype: fillInTheBlanksTextSubtypeSchema.nullable().optional(),
}).strict();
export type FillInTheBlanksTextVariable = z.infer<typeof fillInTheBlanksTextVariableSchema>;

export const fillInTheBlanksChoiceVariableSchema = fillInTheBlanksVariableBaseSchema.extend({
    type: z.literal("choice"),
    rightChoice: z.string(),
    wrongChoices: z.array(z.string()),
}).strict();
export type FillInTheBlanksChoiceVariable = z.infer<typeof fillInTheBlanksChoiceVariableSchema>;

export function getAllChoicesFromChoiceVariable(variable: FillInTheBlanksChoiceVariable): string[] {
    return [variable.rightChoice, ...variable.wrongChoices].sort();
}

// --------------------------------------------------------------------------------------------------------------------
// union type and derived types
// --------------------------------------------------------------------------------------------------------------------

export const fillInTheBlanksVariableSchema = z.discriminatedUnion("type", [
    fillInTheBlanksTextVariableSchema,
    fillInTheBlanksChoiceVariableSchema,
]);
export type FillInTheBlanksVariable = z.infer<typeof fillInTheBlanksVariableSchema>;
