import {ReactNode, useEffect} from "react";
import {Button} from "@mui/material";
import {StepInstanceProps} from "../step/createSteppedUnit";
import {FadeIn} from "../../components/effects/FadeIn";
import {CenterInline} from "../../components/layout/CenterInline";

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

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                onClickButton();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    })
    
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
