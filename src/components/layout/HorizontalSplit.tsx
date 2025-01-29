import {ReactNode} from "react";

export interface HorizontalSplitProps {
    positionPercentage?: number; // default is 50
    children: [ReactNode, ReactNode];
}

export function HorizontalSplit(props: HorizontalSplitProps) {
    const leftWidthPercentage = props.positionPercentage ?? 50;
    const rightWidthPercentage = 99 - leftWidthPercentage;
    return <>
        <div style={{width: "100%"}}>
            <div style={{display: "inline-block", verticalAlign: "top", width: leftWidthPercentage + "%"}}>
                {props.children[0]}
            </div>
            <div style={{display: "inline-block", verticalAlign: "top", width: rightWidthPercentage + "%"}}>
                {props.children[1]}
            </div>
        </div>
    </>
}