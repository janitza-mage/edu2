import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {NumberKeyboardLayoutReadStep} from "./NumberKeyboardLayoutReadStep";

export interface CreateNumberKeyboardLayoutReadStepParameters {
    content: ReactNode;
    widthPercent?: number | undefined | null;
    overflow?: string;
    buttonLabel?: string | undefined | null;
}

export function createNumberKeyboardLayoutReadStep(parameters: CreateNumberKeyboardLayoutReadStepParameters): UnitStep {
    return props => {
        return <NumberKeyboardLayoutReadStep
            content={parameters.content}
            widthPercent={parameters.widthPercent}
            overflow={parameters.overflow}
            buttonLabel={parameters.buttonLabel ?? "weiter"}
            onClickButton={props.onFinishStep}
        />;
    };
}
