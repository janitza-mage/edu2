import {ReactNode} from "react";

export interface TextSizeProps {
    size: number;
    children: ReactNode;
}

export function TextSize(props: TextSizeProps) {
    return <div style={{fontSize: props.size + "em", width: "100%", height: "100%"}}>
        {props.children}
    </div>;
}
