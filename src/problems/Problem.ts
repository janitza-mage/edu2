import {ReactElement} from "react";

export interface ProblemProps {
    onFinish: () => void;
}

export type Problem = ((props: ProblemProps) => ReactElement);
