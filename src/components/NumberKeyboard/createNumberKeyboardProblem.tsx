import {ReactNode} from "react";
import {NumberKeyboardProblem} from "./NumberKeyboardProblem";
import {Problem} from "../../problems/Problem";

export interface NumberKeyboardProblemParameters {
    body: (input: string) => ReactNode; // input is a string because it is initially empty, not a number
    validator: number | ((n: number) => boolean);
    widthPercent?: number | undefined | null;
    overflow?: string;
}

export function createNumberKeyboardProblem(parameters: NumberKeyboardProblemParameters): Problem {
    return props => <NumberKeyboardProblem
        body={parameters.body}
        validator={parameters.validator}
        widthPercent={parameters.widthPercent}
        overflow={parameters.overflow}
        onFinish={props.onFinish}
    />;
}
