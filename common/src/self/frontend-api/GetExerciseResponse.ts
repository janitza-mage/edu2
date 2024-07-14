import {ExerciseDefinition} from "../types/ExerciseDefinition";

// TODO rename to GetUnitPageContentResponse
export interface GetExerciseResponse {
    authorId: number;
    description: string;
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}
