import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {ReadStep} from "./ReadStep";

export interface CreateReadStepParameters {
    content: ReactNode;
    widthPercent?: number | undefined | null;
    buttonLabel?: string | undefined | null;
    fadeIn?: boolean;
}

export function createReadStep(parameters: CreateReadStepParameters): UnitStep {
    return props => <ReadStep
        content={parameters.content}
        widthPercent={parameters.widthPercent}
        buttonLabel={parameters.buttonLabel}
        fadeIn={parameters.fadeIn}
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
    />;
}
