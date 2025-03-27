import {ReactNode, useEffect, useState} from "react";
import {WithFooter} from "../layout/WithFooter";
import {NumberKeyboard} from "./NumberKeyboard";
import {CenteredContent} from "../layout/CenteredContent";
import {useFeedbackControl} from "../effects/useFeedbackControl";

export interface NumberKeyboardProblemProps {
    body: (input: string) => ReactNode; // input is a string because it is initially empty, not a number
    validator: number | ((n: number) => boolean);
    widthPercent?: number | undefined | null;
    overflow?: string;
    onFinish: () => void;
}

export function NumberKeyboardProblem(props: NumberKeyboardProblemProps) {
    const [input, setInput] = useState("");
    const feedback = useFeedbackControl();

    function onClickNumber(n: number | string) {
        setInput(input + "" + n);
    }
    
    function onClickErase() {
        setInput(input.length === 0 ? input : input.substring(0, input.length - 1));
    }
    
    function onConfirm() {
        // multi-field not supported yet
        const inputValue = parseInt(input);
        if (!isNaN(inputValue)) {
            if (typeof props.validator === "number" ? inputValue === props.validator : props.validator(inputValue)) {
                feedback.fire(true, props.onFinish);
            } else {
                feedback.fire(false, () => feedback.hide());
            }
        }
    }
    
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            switch (event.key) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    onClickNumber(event.key);
                    break;
                case "Backspace":
                    onClickErase();
                    break;
                case "Enter":
                    onConfirm();
                    break;
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    })

    const keyboard = <NumberKeyboard onClickNumber={onClickNumber} onClickErase={onClickErase} onClickConfirm={onConfirm} />;
    // TODO block events if feedback.disabled
    return <WithFooter footer={keyboard} overflow={props.overflow ?? "hidden"}>
        <div style={{width: "100%", height: "100%", backgroundColor: feedback.color}}>
            <CenteredContent widthPercent={props.widthPercent ?? 90}>
                {props.body(input)}
            </CenteredContent>
        </div>
    </WithFooter>;
}
