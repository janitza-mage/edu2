import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {ReadStep} from "./ReadStep";
import {CenteredContent} from "../../components/layout/CenteredContent";

export interface CreateReadStepParameters {
    content: ReactNode;
    widthPercent?: number | undefined | null;
    buttonLabel?: string | undefined | null;
    fadeIn?: boolean;
}

export function createReadStep(parameters: CreateReadStepParameters): UnitStep {
    return props => <CenteredContent widthPercent={parameters.widthPercent ?? 90}>
        <ReadStep
            content={parameters.content}
            buttonLabel={parameters.buttonLabel}
            fadeIn={parameters.fadeIn}
            onProgress={props.onProgress}
            onMistake={props.onMistake}
            onFinishStep={props.onFinishStep}
        />
    </CenteredContent>;
}
