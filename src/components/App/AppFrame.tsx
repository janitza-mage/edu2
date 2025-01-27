import styles from "./AppFrame.module.scss";
import {ReactElement, ReactNode} from "react";

export interface AppFrameProps {
    children: ReactNode;
}

export function AppFrame({children}: AppFrameProps): ReactElement {
    console.log("rendering AppFrame");
    return <div className={styles.AppFrame}>
        {children}
    </div>;
}
