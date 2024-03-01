import {ExerciseDefinition} from "../types/ExerciseDefinition";

export interface GetExerciseResponse {
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}
