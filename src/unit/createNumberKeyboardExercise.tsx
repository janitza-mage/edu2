import {ReactNode, useState} from "react";
import {UnitStep} from "./createSteppedUnit";
import {NumberKeyboardExercise} from "../components/unit/NumberKeyboardExercise";

export interface createNumberKeyboardExerciseParameters {
    body: (input: string) => ReactNode; // input is a string because it is initially empty, not a number
    correct: number | ((n: number) => boolean);
    widthPercent?: number | undefined | null;
    overflow?: string;
}

export function createNumberKeyboardExercise(parameters: createNumberKeyboardExerciseParameters): UnitStep {
    return props => {
        const [input, setInput] = useState("");
        
        function onConfirm() {
            let validator: (x: number) => boolean;
            if ((typeof parameters.correct) === "number") {
                validator = (x: number) => (x === parameters.correct)
            } else {
                validator = parameters.correct as (x: number) => boolean;
            }
            
            // multi-field not supported yet
            const inputValue = parseInt(input);
            if (!isNaN(inputValue)) {
                if (validator(inputValue)) {
                    props.onProgress();
                    props.onFinishStep();
                } else {
                    props.onMistake();
                }
            }
        }
        
        return <NumberKeyboardExercise
            onClickNumber={n => setInput(input + "" + n)}
            onClickErase={() => setInput(input.length === 0 ? input : input.substring(0, input.length - 1))}
            onClickConfirm={onConfirm}
        >
            {parameters.body(input)}
        </NumberKeyboardExercise>
    };
}
