import {ReactNode} from "react";
import styles from "./FadeIn.module.css";
import {isFastMode} from "../App/developer";

export interface FadeInProps {
    children: ReactNode;
    delay: 0 | 1 | false; // 0 = fade in immediately, false = show immediately without even fading
}

export function FadeIn(props: FadeInProps) {
    return <div className={`${styles.all} ${determineAnimationClass(props)}`}>
        {props.children}
    </div>;
}

function determineAnimationClass(props: FadeInProps): string {
    if (isFastMode()) {
        return "";
    } else if (props.delay === 0) {
        return styles.fadeInDelay0;
    } else if (props.delay === 1) {
        return  styles.fadeInDelay1;
    } else {
        return "";
    }
}
