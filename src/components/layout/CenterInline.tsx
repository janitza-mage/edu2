import {ReactNode} from "react";

export interface CenterInlineProps {
    children: ReactNode;
}

/**
 * A DIV that horizontally centers its inline contents.
 */
export function CenterInline(props: CenterInlineProps) {
    return <div style={{textAlign: "center"}}>
        {props.children}
    </div>
}
