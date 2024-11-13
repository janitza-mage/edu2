import {ExerciseDefinition} from "../types/ExerciseDefinition";

export interface GetUnitPageContentResponse {
    authorId: number;
    title: string;
    description: string;
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}
