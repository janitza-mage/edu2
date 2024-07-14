import {ReactNode, RefObject} from "react";

export interface WithFooterProps {
    footer: ReactNode;
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement | undefined> | undefined;
}

export function WithFooter(props: WithFooterProps) {
    return <div style={{display: "flex", flexDirection: "column", height: "100%", overflow: "hidden"}}>
        <div
            style={{flex: "1 1 auto", overflow: "auto", marginBottom: "10px", position: "relative"}}
            ref={props.scrollContainerRef as RefObject<HTMLDivElement>}
        >{props.children}</div>
        {props.footer}
    </div>;
}
