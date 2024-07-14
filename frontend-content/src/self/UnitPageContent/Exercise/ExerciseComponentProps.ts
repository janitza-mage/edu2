import {Exercise} from "../../../common/types/Exercise";

/**
 * Note: The exercise object includes the exercise description, but that is shown by the enclosing
 * MaterializedExerciseSheet to avoid repeating the code for it in every exercise component.
 */
export interface ExerciseComponentProps<E extends Exercise> {

    /**
     * The ID of the course's author.
     */
    authorId: number;

    /**
     * The ID of the course that contains the exercise.
     */
    courseId: number;

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

}
