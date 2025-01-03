import {CSSProperties, ReactNode, useState} from "react";
import {Button} from "@mui/material";
import {UnitStep} from "./createSteppedUnit";
import {CenteredContent} from "../components/layout/CenteredContent";
import {FadeIn} from "../components/effects/FadeIn";
import {sounds} from "../sounds/sounds";
import {isFastMode} from "../components/App/developer";

export interface OrderedChooseSingleItem {
    label: ReactNode;
    correct: boolean;
}

export interface CreateOrderedChooseSingleStepParameters {
    title: ReactNode;
    items: OrderedChooseSingleItem[];
    widthPercent?: number | undefined | null;
}

export function createOrderedChooseSingleStep(parameters: CreateOrderedChooseSingleStepParameters): UnitStep {
    return props => {
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        
        function onClickItem(item: OrderedChooseSingleItem, index: number) {
            if (highlightedIndex >= 0) {
                // disable clicking while highlighted, especially once the correct item has been selected
                return;
            }
            setHighlightedIndex(index);
            if (item.correct) {
                sounds.correct.play();
                props.onProgress();
                setTimeout(() => {
                    setHighlightedIndex(-1);
                    props.onFinishStep();
                }, isFastMode() ? 100 : 1000);
            } else {
                sounds.wrong.play();
                props.onMistake();
                setTimeout(() => {
                    setHighlightedIndex(-1);
                }, isFastMode() ? 100 : 500);
            }
        }
        
        return <CenteredContent widthPercent={parameters.widthPercent ?? 75}>
            <div style={{marginBottom: "1em"}}>{parameters.title}</div>
            {parameters.items.map((item, index) =>
                <div style={getItemStyle(index, highlightedIndex, item.correct)} onClick={() => onClickItem(item, index)}
                >
                    {item.label}
                </div>
            )}
        </CenteredContent>;
    };
}

function getItemStyle(index: number, highlightedIndex: number, correct: boolean): CSSProperties {
    const base: CSSProperties = {
        marginBottom: "0.6em",
        userSelect: "none",
        padding: "0.5em",
    };
    if (index !== highlightedIndex) {
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
