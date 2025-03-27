import {CSSProperties, ReactNode, useState} from "react";
import {sounds} from "../../app/sounds";
import {ProblemProps} from "../../problems/Problem";

export interface ImmediateFeedbackChoiceProblemItem {
    label: ReactNode;
    correct: boolean;
}

export type ImmediateFeedbackChoiceProblemVariant = "default" | "inline";

export interface ImmediateFeedbackChoiceProblemProps extends ProblemProps {
    title: ReactNode;
    items: ImmediateFeedbackChoiceProblemItem[];
    variant?: ImmediateFeedbackChoiceProblemVariant;
}

function withElementSet<T>(array: T[], index: number, value: T): T[] {
    array = [...array];
    array[index] = value;
    return array;
}

export function ImmediateFeedbackChoiceProblem(props: ImmediateFeedbackChoiceProblemProps) {
    
    const [selectedFlags, setSelectedFlags] = useState(() => props.items.map(_ => false));
    const [enabled, setEnabled] = useState(true);
    
    function onClickItem(item: ImmediateFeedbackChoiceProblemItem, index: number) {
        if (!enabled || selectedFlags[index]) {
            // clicking too fast, or clicking an item again that has been selected already
            return;
        }
        const newSelectedFlags = withElementSet(selectedFlags, index, true);
        setSelectedFlags(newSelectedFlags);
        if (item.correct) {
            sounds.correct.play();
            if (props.items.every((item, index) => !item.correct || newSelectedFlags[index])) {
                setEnabled(false);
                setTimeout(props.onFinish, 500);
            }
        } else {
            sounds.wrong.play();
            setEnabled(false);
            setTimeout(() => {
                setSelectedFlags(flags => withElementSet(flags, index, false));
                setEnabled(true);
            }, 500);
        }
    }

    return <>
        {props.title && <div style={{marginBottom: "1em"}}>{props.title}</div>}
        <div style={{textAlign: "center"}}>
            {props.items.map((item, index) => <Item
                key={index}
                variant={props.variant ?? "default"}
                selected={selectedFlags[index]}
                correct={item.correct}
                onClick={() => onClickItem(item, index)}
                label={item.label}
            />)}
        </div>
    </>;
}

// --------------------------------------------------------------------------------------------------------------------

interface ItemProps {
    variant: ImmediateFeedbackChoiceProblemVariant;
    selected: boolean;
    correct: boolean;
    onClick: () => void;
    label: ReactNode;
}

function Item(props: ItemProps) {
    const base: CSSProperties = {
        userSelect: "none",
        padding: "0.5em",
        fontSize: "2em",
    };
    
    const colors: CSSProperties =
        !props.selected
        ? {border: "2px solid #aaa"}
        : props.correct
        ? {border: "2px solid #0c0", backgroundColor: "#8f8"}
        : {border: "2px solid #c00", backgroundColor: "#f88"};

    switch (props.variant) {

        case "inline": {
            const style = {
                ...base,
                ...colors,
                display: "inline-block",
                marginLeft: "0.6em",
            };
            return <div style={style} onClick={props.onClick}>{props.label}</div>;
        }

        case "default":
        default: {
            const style = {
                ...base,
                ...colors,
                marginBottom: "0.6em",
            };
            return <div style={style} onClick={props.onClick}>{props.label}</div>;
        }

    }
}
