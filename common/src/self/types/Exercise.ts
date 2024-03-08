import {arrayIsNotEmpty} from "../util/arrayIsEmpty";
import {zodEnum} from "../util/zod/zodEnum";
import {z} from "zod";
import {fillInTheBlanksVariableSchema} from "./FillInTheBlanksVariable";

// --------------------------------------------------------------------------------------------------------------------
// core types
// --------------------------------------------------------------------------------------------------------------------

// TODO this is upper camel case, exercise definition is lower camel case
export const exerciseTypeSchema = zodEnum(["Nop", "Dummy", "ChooseOne", "ChooseYesNo", "FillInTheBlanks", "Script"]);
export type ExerciseType = z.infer<typeof exerciseTypeSchema>;

export const exerciseBaseSchema = z.object({
    description: z.string(),
    epilogue: z.string().optional(),
    type: exerciseTypeSchema,
}).strict();
export type ExerciseBase = z.infer<typeof exerciseBaseSchema>;

// --------------------------------------------------------------------------------------------------------------------
// different exercise types
// --------------------------------------------------------------------------------------------------------------------

export const nopExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("Nop"),
}).strict();
export type NopExercise = z.infer<typeof nopExerciseSchema>;

export const dummyExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("Dummy"),
}).strict();
export type DummyExercise = z.infer<typeof dummyExerciseSchema>;

export const chooseOneExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("ChooseOne"),
    rightAnswer: z.string(),
    wrongAnswers: z.array(z.string()),
}).strict();
export type ChooseOneExercise = z.infer<typeof chooseOneExerciseSchema>;

export const chooseYesNoExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("ChooseYesNo"),
    rightAnswer: z.boolean(),
}).strict();
export type ChooseYesNoExercise = z.infer<typeof chooseYesNoExerciseSchema>;

export const fillInTheBlanksExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("FillInTheBlanks"),
    stencil: z.string(),
    variables: z.array(fillInTheBlanksVariableSchema),
}).strict();
export type FillInTheBlanksExercise = z.infer<typeof fillInTheBlanksExerciseSchema>;

export const scriptExerciseSchema = exerciseBaseSchema.extend({
    type: z.literal("Script"),
    script: z.string(),
}).strict();
export type ScriptExercise = z.infer<typeof scriptExerciseSchema>;

// --------------------------------------------------------------------------------------------------------------------
// union type and derived types
// --------------------------------------------------------------------------------------------------------------------

export const exerciseSchema = z.discriminatedUnion("type", [
    nopExerciseSchema,
    dummyExerciseSchema,
    chooseOneExerciseSchema,
    chooseYesNoExerciseSchema,
    fillInTheBlanksExerciseSchema,
    scriptExerciseSchema,
]);
export type Exercise = z.infer<typeof exerciseSchema>;

// TODO rename to ExerciseSequence or something -- exercise sheets _can_ be implemented differently
export const exerciseSheetSchema = z.array(exerciseSchema);
export type ExerciseSheet = z.infer<typeof exerciseSheetSchema>;

export type NonEmptyExerciseSheet = ExerciseSheet & [Exercise, ...Exercise[]];

// --------------------------------------------------------------------------------------------------------------------
// helper functions
// --------------------------------------------------------------------------------------------------------------------

export function makeExerciseSheetNonEmpty(exerciseSheet: ExerciseSheet | null): NonEmptyExerciseSheet {
    if (exerciseSheet !== null && arrayIsNotEmpty(exerciseSheet)) {
        return exerciseSheet;
    }
    return [
        {
            description: "This unit does not have any actual exercises, so the \"exercise\" is to confirm that you have read this unit.",
            type: "Nop",
        },
    ];
}
