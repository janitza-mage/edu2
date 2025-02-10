import {StepInstanceProps} from "../../../unit/step/createSteppedUnit";
import {mathDiv} from "../../../components/Math/Math";
import {SortExercise} from "./SortExercise";
import {ReactNode} from "react";
import styles from "./SortEquationTransformationExercise.module.css";

export interface SortEquationTransformationExerciseProps extends StepInstanceProps {
    description: ReactNode;
    equations: string[];
}

export function SortEquationTransformationExercise(props: SortEquationTransformationExerciseProps) {
    return <div className={styles.sortEquationTransformationExercise}>
        <SortExercise {...props} items={props.equations.map(mathDiv)} />
    </div>;
}
