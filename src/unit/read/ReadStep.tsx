import {ReactNode} from "react";
import {Button} from "@mui/material";
import {StepInstanceProps} from "../step/createSteppedUnit";
import {FadeIn} from "../../components/effects/FadeIn";
import {CenterInline} from "../../components/layout/CenterInline";
import {useOnEnter} from "../../components/util/useOnEnter";

export interface ReadStepProps extends StepInstanceProps {
    content: ReactNode;
    buttonLabel?: string | undefined | null;
    fadeIn?: boolean;
}

export function ReadStep(props: ReadStepProps) {
    
    function onClickButton() {
        props.onProgress();
        props.onFinishStep();
    }

    useOnEnter(onClickButton);
    
    return <>
        <div>
            {props.content}
        </div>
        <br />
        <FadeIn delay={(props.fadeIn ?? true) ? 1 : false}>
            <CenterInline>
                <Button variant="contained" onClick={onClickButton}>{props.buttonLabel ?? "weiter"}</Button>
            </CenterInline>
        </FadeIn>
    </>;
}
