import {ReactNode, useState} from "react";
import {WithFooter} from "../layout/WithFooter";
import {FormulaKeyboard} from "./FormulaKeyboard";
import {CenteredContent} from "../layout/CenteredContent";
import {useExerciseSingletonFeedback} from "../util/useExerciseSingletonFeedback";
import {CursorPosition, FormulaNode, FormulaNodeAndCursorPosition, SequenceNode} from "./FormulaNode";

export interface FormulaKeyboardExerciseProps {
    formulaKeys: ([ReactNode, FormulaNode] | string)[];
    body: (input: FormulaNode, cursorPosition: CursorPosition) => ReactNode;
    validator: (input: FormulaNode) => boolean;
    widthPercent?: number | undefined | null;
    overflow?: string;
    onProgress: () => void;
    onMistake: () => void;
    onFinishStep: () => void;
}

export function FormulaKeyboardExercise(props: FormulaKeyboardExerciseProps) {
    const [input, setInput] = useState<FormulaNode>(new SequenceNode([]));
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>([0]);
    const feedback = useExerciseSingletonFeedback();
    
    function handleResult(result: FormulaNodeAndCursorPosition | null) {
        if (result) {
            setInput(result.formulaNode);
            setCursorPosition(result.cursorPosition);
        } else {
            // just a slight visual hint that the current keypress has no effect, e.g. pressing backspace
            // when the cursor is at the beginning.
            feedback.fire("#ddd", () => feedback.hide());
        }
    }
    
    function handleCursorPosition(position: CursorPosition | null) {
        if (position) {
            setCursorPosition(position);
        } // no visual feedback for bumping the cursor against the side walls
    }

    function onClickInsertFormulaNode(node: FormulaNode) {
        handleResult(input.insertLeft(cursorPosition, node));
    }
    
    function onClickDeleteLeft() {
        handleResult(input.deleteLeft(cursorPosition));
    }
    
    function onClickDeleteRight() {
        handleResult(input.deleteRight(cursorPosition));
    }
    
    function onClickMoveLeft() {
        handleCursorPosition(input.getPreviousCursorPosition(cursorPosition));
    }
    
    function onClickMoveRight() {
        handleCursorPosition(input.getNextCursorPosition(cursorPosition));
    }
    
    function onReset() {
        setInput(new SequenceNode([]));
        setCursorPosition([0]);
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
        formulaKeys={props.formulaKeys}
        onClickInsertFormulaNode={onClickInsertFormulaNode}
        onClickDeleteLeft={onClickDeleteLeft}
        onClickDeleteRight={onClickDeleteRight}
        onClickMoveLeft={onClickMoveLeft}
        onClickMoveRight={onClickMoveRight}
        onClickReset={onReset}
        onClickConfirm={onConfirm}
        visible={true}
    />;
    // TODO handle overflow once the TODO at CenteredContent is solved
    // TODO block events if feedback.disabled
    return <WithFooter footer={keyboard} overflow={props.overflow ?? "hidden"}>
        <div style={{width: "100%", height: "100%", backgroundColor: feedback.color}}>
            <CenteredContent widthPercent={props.widthPercent ?? 90}>
                {props.body(input, cursorPosition)}
            </CenteredContent>
        </div>
    </WithFooter>;
}
