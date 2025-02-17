import {ReactNode, useState} from "react";
import {WithFooter} from "../layout/WithFooter";
import {FormulaKeyboard} from "./FormulaKeyboard";
import {CenteredContent} from "../layout/CenteredContent";
import {useExerciseSingletonFeedback} from "../util/useExerciseSingletonFeedback";
import {Atom, FormulaNode, SequenceNode} from "./FormulaNode";

export interface FormulaKeyboardExerciseProps {
    body: (input: FormulaNode) => ReactNode;
    validator: (input: FormulaNode) => boolean;
    widthPercent?: number | undefined | null;
    overflow?: string;
    onProgress: () => void;
    onMistake: () => void;
    onFinishStep: () => void;
}

export function FormulaKeyboardExercise(props: FormulaKeyboardExerciseProps) {
    const [input, setInput] = useState<FormulaNode>(new SequenceNode([]));
    const feedback = useExerciseSingletonFeedback();

    function onClickInsertFormulaNode(node: FormulaNode) {
        // setInput(input + "" + n);
    }
    
    function onClickDeleteLeft() {
        // setInput(input.length === 0 ? input : input.substring(0, input.length - 1));
    }
    
    function onClickDeleteRight() {
    }
    
    function onClickMoveLeft() {
    }
    
    function onClickMoveRight() {
    }
    
    function onConfirm() {
        /*
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
         */
    }

    /*
    TODO consider keyboard mapping
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
     */

    const keyboard = <FormulaKeyboard
        formulaKeys={[
            [1, new Atom("1")],
            [2, new Atom("2")],
            [3, new Atom("3")],
        ]}
        onClickInsertFormulaNode={onClickInsertFormulaNode}
        onClickDeleteLeft={onClickDeleteLeft}
        onClickDeleteRight={onClickDeleteRight}
        onClickMoveLeft={onClickMoveLeft}
        onClickMoveRight={onClickMoveRight}
        onClickConfirm={onConfirm}
        visible={true}
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
