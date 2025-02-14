import {StepInstanceProps} from "../../../unit/step/createSteppedUnit";
import {mathDiv} from "../../../components/Math/Math";
import styles from "./EquationTransformationArrowExercise.module.css";
import {sounds} from "../../../sounds/sounds";
import {useFlashExerciseBackgroundCorrectOrWrong} from "../../../components/effects/useFlashExerciseBackground";
import {useState} from "react";

export interface EquationTransformationArrowExerciseProps extends StepInstanceProps {
    equations: string[];
    correctArrowIndex: number;
}

/**
 * No create* functions are provided here as this exercise is often embedded between paragraphs of text, so
 * such a function would be useless.
 */
export function EquationTransformationArrowExercise(props: EquationTransformationArrowExerciseProps) {
    const flashExerciseBackgroundCorrectOrWrong = useFlashExerciseBackgroundCorrectOrWrong();
    const [enabled, setEnabled] = useState(true);

    function onClickArrow(index: number) {
        if (!enabled) {
            return;
        }
        setEnabled(false);
        if (index === props.correctArrowIndex) {
            sounds.correct.play();
            flashExerciseBackgroundCorrectOrWrong(true, 1000, props.onFinishStep);
            props.onProgress();
        } else {
            sounds.wrong.play();
            flashExerciseBackgroundCorrectOrWrong(false, 500, () => setEnabled(true));
            props.onMistake();
        }
    }
    
    return <>
        {props.equations.map((equation, index) => {
            return <div className={styles.equation}>
                <div className={styles.arrowContainer} onClick={() => onClickArrow(index)}>
                    <span className={styles.arrow}>{"\u21b7"}</span>
                </div>
                {mathDiv(equation)}
            </div>;
        })}
    </>;
}
