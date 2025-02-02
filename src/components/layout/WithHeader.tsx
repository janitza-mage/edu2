import {ReactNode} from "react";

export interface WithHeaderProps {
    children: ReactNode;
    header: ReactNode;
    overflow: string;
}

export function WithHeader(props: WithHeaderProps) {
    return <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{flex: "0 0 auto"}}>
            {props.header}
        </div>
        <div style={{flex: "1 1 0", overflow: props.overflow}}>
            {props.children}
        </div>
    </div>;
}
