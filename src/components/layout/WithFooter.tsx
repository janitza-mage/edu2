import {ReactNode} from "react";

export interface WithFooterProps {
    children: ReactNode;
    footer: ReactNode;
    overflow: string;
}

export function WithFooter(props: WithFooterProps) {
    return <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{flex: "1 1 0", overflow: props.overflow}}>
            {props.children}
        </div>
        <div style={{flex: "0 0 auto"}}>
            {props.footer}
        </div>
    </div>;
}
