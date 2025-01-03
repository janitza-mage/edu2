import {CSSProperties, ReactNode, useState} from "react";
import {CenteredContent} from "../layout/CenteredContent";
import {sounds} from "../../sounds/sounds";
import {StepInstanceProps} from "../../unit/createSteppedUnit";
import {isFastMode} from "../App/developer";

export interface ImmediateFeedbackChoiceExerciseItem {
    label: ReactNode;
    correct: boolean;
}

export interface ImmediateFeedbackChoiceExerciseProps extends StepInstanceProps {
    title: ReactNode;
    items: ImmediateFeedbackChoiceExerciseItem[];
    widthPercent?: number | undefined | null;
}

function withElementSet<T>(array: T[], index: number, value: T): T[] {
    array = [...array];
    array[index] = value;
    return array;
}

export function ImmediateFeedbackChoiceExercise(props: ImmediateFeedbackChoiceExerciseProps) {
    
    const [selectedFlags, setSelectedFlags] = useState(() => props.items.map(_ => false));
    const [enabled, setEnabled] = useState(true);
    
    function onClickItem(item: ImmediateFeedbackChoiceExerciseItem, index: number) {
        if (!enabled) {
            return;
        }
        const newSelectedFlags = withElementSet(selectedFlags, index, true);
        setSelectedFlags(newSelectedFlags);
        if (item.correct) {
            sounds.correct.play();
            props.onProgress();
            if (props.items.every((item, index) => !item.correct || newSelectedFlags[index])) {
                setEnabled(false);
                setTimeout(props.onFinishStep, isFastMode() ? 100 : 1000);
            }
        } else {
            sounds.wrong.play();
            props.onMistake();
            setEnabled(false);
            setTimeout(() => {
                setSelectedFlags(flags => withElementSet(flags, index, false));
                setEnabled(true);
            }, isFastMode() ? 100 : 500);
        }
    }

    return <CenteredContent widthPercent={props.widthPercent ?? 75}>
        <div style={{marginBottom: "1em"}}>{props.title}</div>
        {props.items.map((item, index) =>
            <div style={getItemStyle(selectedFlags[index], item.correct)} onClick={() => onClickItem(item, index)}
            >
                {item.label}
            </div>
        )}
    </CenteredContent>;
}

function getItemStyle(selected: boolean, correct: boolean): CSSProperties {
    const base: CSSProperties = {
        marginBottom: "0.6em",
        userSelect: "none",
        padding: "0.5em",
    };
    if (!selected) {
        return {
            ...base,
            border: "2px solid #aaa",
        };
    } else if (correct) {
        return {
            ...base,
            border: "2px solid #0c0",
            backgroundColor: "#8f8",
        };
    } else {
        return {
            ...base,
            border: "2px solid #c00",
            backgroundColor: "#f88",
        };
    }
}
