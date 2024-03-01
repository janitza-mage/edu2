import {Exercise} from "../../../common/types/Exercise";

/**
 * Note: The exercise object includes the exercise description, but that is shown by the enclosing
 * MaterializedExerciseSheet to avoid repeating the code for it in every exercise component.
 */
export interface ExerciseComponentProps<E extends Exercise> {

    /**
     * The exercise data.
     */
    exercise: E;

    /**
     * Whether the exercise has been answered by the user. This should disable all inputs and may show any hints
     * and explanations.
     */
    answered: boolean;

    /**
     * Marks the exercise as answered (setting the "answered" property to true) and reports the result to the
     * grading logic.
     */
    reportResult: (correct: boolean) => void;

    /**
     * Sets the size of the enclosing iframe to the size of the content. This must be called whenever the content
     * changes its size. Note that the outer component calls this automatically after another exercise becomes
     * visible, but if the exercise itself changes its size, it must call this function manually.
     */
    adjustContainerSize: () => void;

    /**
     * This is often used in conjunction with adjustContainerSize() if the latter is used to make additional content
     * visible at the bottom. Again, the outer component calls this automatically after another exercise becomes
     * visible.
     */
    scrollToBottom: () => void;

}
