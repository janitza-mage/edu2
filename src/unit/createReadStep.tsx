import {ReactNode} from "react";
import {Button} from "@mui/material";
import {UnitStep} from "./createSteppedUnit";
import {CenteredContent} from "../components/layout/CenteredContent";
import {FadeIn} from "../components/effects/FadeIn";

export interface CreateReadStepParameters {
    content: ReactNode;
    widthPercent?: number | undefined | null;
    buttonLabel?: string | undefined | null;
}

export function createReadStep(parameters: CreateReadStepParameters): UnitStep {
    return props => {
        function onClickButton() {
            props.onProgress();
            props.onFinishStep();
        }
        return <CenteredContent widthPercent={parameters.widthPercent ?? 50}>
            <div>
                {parameters.content}
            </div>
            <br />
            <FadeIn delay={2}>
                <Button variant="contained" onClick={onClickButton}>{parameters.buttonLabel ?? "weiter"}</Button>
            </FadeIn>
        </CenteredContent>;
    };
}
