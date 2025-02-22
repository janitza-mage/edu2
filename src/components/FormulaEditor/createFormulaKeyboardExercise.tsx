import {ReactNode} from "react";
import {CursorPosition, FormulaNode} from "./FormulaNode";
import {UnitStep} from "../../unit/step/createSteppedUnit";
import {FormulaKeyboardExercise} from "./FormulaKeyboardExercise";

export interface createFormulaKeyboardExerciseParameters {
    formulaKeys: ([ReactNode, FormulaNode] | string)[];
    body: (input: FormulaNode, cursorPosition: CursorPosition) => ReactNode;
    validator: (input: FormulaNode) => boolean;
    widthPercent?: number | undefined | null;
    overflow?: string;
}

export function createFormulaKeyboardExercise(parameters: createFormulaKeyboardExerciseParameters): UnitStep {
    return props => <FormulaKeyboardExercise
        formulaKeys={parameters.formulaKeys}
        body={parameters.body}
        validator={parameters.validator}
        widthPercent={parameters.widthPercent}
        overflow={parameters.overflow}
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
    />;
}
