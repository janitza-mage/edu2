import {ReactNode, useState} from "react";
import {Button} from "@mui/material";
import {UnitStep} from "./createSteppedUnit";
import {CenteredContent} from "../components/layout/CenteredContent";
import {FadeIn} from "../components/effects/FadeIn";

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
                props.onProgress();
                setTimeout(() => {
                    setHighlightedIndex(-1);
                    props.onFinishStep();
                }, 1000);
            } else {
                props.onMistake();
                setTimeout(() => {
                    setHighlightedIndex(-1);
                }, 500);
            }
        }
        
        return <CenteredContent widthPercent={parameters.widthPercent ?? 75}>
            <div>{parameters.title}</div>
            {parameters.items.map((item, index) =>
                <div
                    style={{
                        border: getBorder(index, highlightedIndex, item.correct),
                        marginBottom: "1em",
                        userSelect: "none",
                    }}
                    onClick={() => onClickItem(item, index)}
                >
                    {item.label}
                </div>
            )}
        </CenteredContent>;
    };
}

function getBorder(index: number, highlightedIndex: number, correct: boolean) {
    return "2px solid #" + (index !== highlightedIndex) ? "aaa" : correct ? "0c0" : "f00";
}
