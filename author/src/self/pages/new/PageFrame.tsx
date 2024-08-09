import React from "react";

export interface PageFrameProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export function PageFrame(props: PageFrameProps) {
    return <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <div style={{flexGrow: 0, flexShrink: 0, width: "400px"}}>
            {props.sidebar}
        </div>
        <div style={{width: "1px", flexGrow: 1, flexShrink: 1, marginLeft: "10px"}}>
            {props.children}
        </div>
    </div>;
}
