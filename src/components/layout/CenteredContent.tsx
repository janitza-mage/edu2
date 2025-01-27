import {ReactNode} from "react";

export interface CenteredContentProps {
    widthPercent: number;
    children: ReactNode;
}

/**
 * A horizontally and vertically centered DIV, to be used as the root element for unit content.
 */
export function CenteredContent(props: CenteredContentProps) {
    // TODO handle content that is too large
    return <div style={{width: (props.widthPercent ?? 50) + "%", height: "100%", marginLeft: "auto", marginRight: "auto", position: "relative"}}>
        <div style={{width: "100%", position: "absolute", top: "50%", transform: "translateY(-50%)"}}>
            {props.children}
        </div>
    </div>
}
