import {ReactNode} from "react";

export interface TextSizeProps {
    size: number;
    children: ReactNode;
}

export function TextSize(props: TextSizeProps) {
    return <div style={{fontSize: props.size + "em"}}>
        {props.children}
    </div>;
}
