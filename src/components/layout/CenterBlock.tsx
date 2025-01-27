import {ReactNode} from "react";

export interface CenterBlockProps {
    widthPercent: number;
    children: ReactNode;
}

/**
 * A horizontally centered DIV whose width is a percentage of the outer width.
 */
export function CenterBlock(props: CenterBlockProps) {
    return <div style={{width: (props.widthPercent ?? 50) + "%", marginLeft: "auto", marginRight: "auto"}}>
        {props.children}
    </div>
}
