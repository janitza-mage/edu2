import {ReactNode} from "react";
import {WithFooter} from "../layout/WithFooter";
import {NumberKeyboard} from "./NumberKeyboard";

export interface NumberKeyboardExerciseProps {
    children: ReactNode;
    onClickNumber: (x: number) => void;
    onClickErase: () => void;
    onClickConfirm: () => void;
    overflow?: string;
}

export function NumberKeyboardExercise(props: NumberKeyboardExerciseProps) {
    const keyboard = <NumberKeyboard
        onClickNumber={props.onClickNumber}
        onClickErase={props.onClickErase}
        onClickConfirm={props.onClickConfirm}
    />;
    return <WithFooter footer={keyboard} overflow={props.overflow ?? "hidden"}>
        {props.children}
    </WithFooter>;
}
