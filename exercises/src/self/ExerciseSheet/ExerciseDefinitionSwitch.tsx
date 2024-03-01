import {ExerciseDefinition, exerciseDefinitionSchema} from "../../common/types/ExerciseDefinition";
import {makeExerciseSheetNonEmpty} from "../../common/types/Exercise";
import {MaterializedExerciseSheet} from "./Materialized/MaterializedExerciseSheet";
import {ScriptedExerciseSheet} from "./Script/ScriptedExerciseSheet";
import {validate} from "../util/validate";

export interface ExerciseSheetSourceSwitchProps {
    exerciseDefinition: ExerciseDefinition;
    exerciseScript: string;
    courseScriptLibrary: string;
}

export function ExerciseDefinitionSwitch(props: ExerciseSheetSourceSwitchProps) {
    const exerciseDefinition = validate(exerciseDefinitionSchema, props.exerciseDefinition, "exercise definition");
    switch (exerciseDefinition.type) {

        case "explicit": {
            const exerciseSheet = makeExerciseSheetNonEmpty(exerciseDefinition.exercises);
            return <MaterializedExerciseSheet exerciseSheet={exerciseSheet} />;
        }

        case "script":
            return <ScriptedExerciseSheet
                script={props.exerciseScript}
                courseScriptLibrary={props.courseScriptLibrary}
            />;

        default:
            throw new Error(`unknown exercise definition type: ${(props.exerciseDefinition as any).type}`);

    }
}
