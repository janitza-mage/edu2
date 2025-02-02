import {ReactNode} from "react";
import {WithFooter} from "../../components/layout/WithFooter";
import {NumberKeyboard} from "./NumberKeyboard";
import {CenteredContent} from "../../components/layout/CenteredContent";
import {Button} from "@mui/material";
import {useOnEnter} from "../../components/util/useOnEnter";

export interface NumberKeyboardLayoutReadStepProps {
    content: ReactNode; // input is a string because it is initially empty, not a number
    widthPercent?: number | undefined | null;
    overflow?: string;
    buttonLabel?: string | undefined | null;
    onClickButton: () => void;
}

export function NumberKeyboardLayoutReadStep(props: NumberKeyboardLayoutReadStepProps) {
    useOnEnter(props.onClickButton);

    const keyboard = <div style={{position: "relative"}}>
        <NumberKeyboard visible={false}
            onClickNumber={() => {}}
            onClickErase={() => {}}
            onClickConfirm={() => {}}
        />
        <Button
            style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
            variant="contained"
            onClick={props.onClickButton}
        >
            {props.buttonLabel ?? "weiter"}
        </Button>
    </div>;
        
    return <WithFooter footer={keyboard} overflow={props.overflow ?? "hidden"}>
        <CenteredContent widthPercent={props.widthPercent ?? 90}>
            {props.content}
        </CenteredContent>
    </WithFooter>;
    
}
