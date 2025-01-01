import {ReactNode, RefObject} from "react";

export interface WithFooterProps {
    footer: ReactNode;
    children: ReactNode;
}

export function WithFooter(props: WithFooterProps) {
    return <div style={{display: "flex", flexDirection: "column", height: "100%", overflow: "hidden"}}>
        <div style={{flex: "1 1 auto", overflow: "hidden", marginBottom: "10px", position: "relative"}}>
            {props.children}
        </div>
        {props.footer}
    </div>;
}
