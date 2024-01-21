import {ProgressBarGreen} from "./ProgressBarGreen";
import {ProgressBarBlue} from "./ProgressBarBlue";

export interface ExerciseProgressBarProps {
    score: number;
}

export function ExerciseProgressBar({score}: ExerciseProgressBarProps) {
    return score >= 100
        ? <ProgressBarGreen variant={"determinate"} value={100}/>
        : <ProgressBarBlue variant={"determinate"} value={score}/>;
}