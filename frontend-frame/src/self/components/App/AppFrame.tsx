import styles from './AppFrame.module.scss';
import {ReactElement, ReactNode} from "react";

export interface AppFrameProps {
    children: ReactNode;
}

export function AppFrame({children}: AppFrameProps): ReactElement {
    return <div className={styles.AppFrame}>
        {children}
    </div>;
}
