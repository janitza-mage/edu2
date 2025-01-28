import {ReactNode} from "react";
import {Button} from "@mui/material";
import {UnitStep} from "./createSteppedUnit";
import {CenteredContent} from "../components/layout/CenteredContent";
import {FadeIn} from "../components/effects/FadeIn";
import {CenterInline} from "../components/layout/CenterInline";

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
        return <CenteredContent widthPercent={parameters.widthPercent ?? 90}>
            <div>
                {parameters.content}
            </div>
            <br />
            <FadeIn delay={1}>
                <CenterInline>
                    <Button variant="contained" onClick={onClickButton}>{parameters.buttonLabel ?? "weiter"}</Button>
                </CenterInline>
            </FadeIn>
        </CenteredContent>;
    };
}
