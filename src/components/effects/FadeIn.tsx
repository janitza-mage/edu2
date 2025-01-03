import {ReactNode} from "react";
import styles from "./FadeIn.module.css";

export interface FadeInProps {
    children: ReactNode;
    delay: 0 | 2;
}

export function FadeIn(props: FadeInProps) {
    return <div className={`${styles.all} ${determineAnimationClass(props)}`}>
        {props.children}
    </div>;
}

function determineAnimationClass(props: FadeInProps): string {
    if (props.delay === 0) {
        return styles.fadeInDelay0;
    } else if (props.delay === 2) {
        return  styles.fadeInDelay2;
    } else {
        return "";
    }
}
