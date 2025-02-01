import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {NumberKeyboardExercise} from "./NumberKeyboardExercise";

export interface createNumberKeyboardExerciseParameters {
    body: (input: string) => ReactNode; // input is a string because it is initially empty, not a number
    correct: number | ((n: number) => boolean);
    widthPercent?: number | undefined | null;
    overflow?: string;
}

export function createNumberKeyboardExercise(parameters: createNumberKeyboardExerciseParameters): UnitStep {
    let validator: (x: number) => boolean;
    if ((typeof parameters.correct) === "number") {
        validator = (x: number) => (x === parameters.correct)
    } else {
        validator = parameters.correct as (x: number) => boolean;
    }
    return props => <NumberKeyboardExercise
        body={parameters.body}
        validator={validator}
        widthPercent={parameters.widthPercent}
        overflow={parameters.overflow}
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
    />;
}
