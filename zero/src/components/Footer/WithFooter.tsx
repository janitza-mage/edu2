import {ReactNode} from "react";

export interface WithFooterProps {
    footer: ReactNode;
    children: ReactNode;
}

export function WithFooter(props: WithFooterProps) {
    return <div style={{display: "flex", flexDirection: "column", height: "100%", overflow: "hidden"}}>
        <div style={{flex: "1 1 auto", overflow: "hidden", marginBottom: "10px", position: "relative"}}>
            {props.children}
        </div>
        <div style={{flex: "0 0 auto", overflow: "hidden", padding: "5px", backgroundColor: "#444", color: "white", height: "1.5em", fontSize: "3em"}}>
            {props.footer}
        </div>
    </div>;
}
