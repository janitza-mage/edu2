import {ReactNode, useState} from "react";
import {WithFooter} from "../layout/WithFooter";
import {NumberKeyboard} from "./NumberKeyboard";
import {CenteredContent} from "../layout/CenteredContent";
import {useExerciseSingletonFeedback} from "../util/useExerciseSingletonFeedback";

export interface NumberKeyboardExerciseProps {
    body: (input: string) => ReactNode; // input is a string because it is initially empty, not a number
    validator: (n: number) => boolean;
    widthPercent?: number | undefined | null;
    overflow?: string;
    onProgress: () => void;
    onMistake: () => void;
    onFinishStep: () => void;
}

export function NumberKeyboardExercise(props: NumberKeyboardExerciseProps) {
    const [input, setInput] = useState("");
    const feedback = useExerciseSingletonFeedback();

    function onConfirm() {
        // multi-field not supported yet
        const inputValue = parseInt(input);
        if (!isNaN(inputValue)) {
            if (props.validator(inputValue)) {
                props.onProgress();
                feedback.fire(true, props.onFinishStep);
            } else {
                props.onMistake();
                feedback.fire(false, () => feedback.hide());
            }
        }
    }

    const keyboard = <NumberKeyboard
        onClickNumber={n => setInput(input + "" + n)}
        onClickErase={() => setInput(input.length === 0 ? input : input.substring(0, input.length - 1))}
        onClickConfirm={onConfirm}
    />;
    // TODO handle overflow once the TODO at CenteredContent is solved
    // TODO block events if feedback.disabled
    return <WithFooter footer={keyboard} overflow={props.overflow ?? "hidden"}>
        <div style={{width: "100%", height: "100%", backgroundColor: feedback.color}}>
            <CenteredContent widthPercent={props.widthPercent ?? 90}>
                {props.body(input)}
            </CenteredContent>
        </div>
    </WithFooter>;
}
