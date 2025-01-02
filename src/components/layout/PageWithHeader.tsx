import {ReactNode} from "react";

export interface PageWithHeaderProps {
    header: ReactNode;
    children: ReactNode;
}

export function PageWithHeader(props: PageWithHeaderProps) {
    return <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{flex: "0 0 auto", backgroundColor: "#ccc", borderBottom: "1px solid #aaa"}}>
            {props.header}
        </div>
        <div style={{flex: "1 1 0"}}>
            {props.children}
        </div>
    </div>;

}