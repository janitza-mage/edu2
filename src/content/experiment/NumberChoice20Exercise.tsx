import {CSSProperties, ReactNode, useState} from "react";
import {sounds} from "../../sounds/sounds";
import {StepInstanceProps} from "../../unit/step/createSteppedUnit";
import {createIndexArray} from "../../util/createIndexArray";
import {isFastMode} from "../../components/App/developer";
import {CenteredContent} from "../../components/layout/CenteredContent";

const numbers = createIndexArray(20);

export interface NumberChoice20ExerciseProps extends StepInstanceProps {
    title: ReactNode;
    answer: number;
}

function withElementSet<T>(array: T[], index: number, value: T): T[] {
    array = [...array];
    array[index] = value;
    return array;
}

export function NumberChoice20Exercise(props: NumberChoice20ExerciseProps) {
    const [selectedFlags, setSelectedFlags] = useState(() => numbers.map(_ => false));
    const [enabled, setEnabled] = useState(true);
    
    function onClickNumber(value: number) {
        if (!enabled) {
            return;
        }
        const newSelectedFlags = withElementSet(selectedFlags, value, true);
        setSelectedFlags(newSelectedFlags);
        if (value === props.answer) {
            sounds.correct.play();
            props.onProgress();
            setEnabled(false);
            setTimeout(props.onFinishStep, isFastMode() ? 100 : 1000);
        } else {
            sounds.wrong.play();
            props.onMistake();
            setEnabled(false);
            setTimeout(() => {
                setSelectedFlags(flags => withElementSet(flags, value, false));
                setEnabled(true);
            }, isFastMode() ? 100 : 500);
        }
    }

    return <CenteredContent widthPercent={90}>
        <div style={{marginBottom: "1em"}}>{props.title}</div>
        <table>
            {createIndexArray(4).map(rowIndex => <tr>
                {createIndexArray(5).map(columnIndex => {
                    const value = 5 * rowIndex + columnIndex;
                    return <td>
                        <Item
                            selected={selectedFlags[value]}
                            correct={value === props.answer}
                            onClick={() => onClickNumber(value)}
                            label={value}
                        />
                    </td>;
                })}
            </tr>)}
        </table>
    </CenteredContent>;
}

// --------------------------------------------------------------------------------------------------------------------

interface ItemProps {
    selected: boolean;
    correct: boolean;
    onClick: () => void;
    label: ReactNode;
}

function Item(props: ItemProps) {
    const style: CSSProperties = {
        userSelect: "none",
        padding: "0.5em",
        ...(
            !props.selected
            ? {border: "2px solid #aaa"}
            : props.correct
                ? {border: "2px solid #0c0", backgroundColor: "#8f8"}
                : {border: "2px solid #c00", backgroundColor: "#f88"}
        ),
        display: "block",
        width: "3em",
        height: "3em",
    };
    return <div style={style} onClick={props.onClick}>{props.label}</div>;
}
