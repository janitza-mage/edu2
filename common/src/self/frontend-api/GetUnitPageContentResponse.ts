import {ExerciseDefinition} from "../types/ExerciseDefinition";

export interface GetUnitPageContentResponse {
    authorId: number;
    description: string;
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}
