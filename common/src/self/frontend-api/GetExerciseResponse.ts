import {ExerciseDefinition} from "../types/ExerciseDefinition";

export interface GetExerciseResponse {
    authorId: number;
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}
