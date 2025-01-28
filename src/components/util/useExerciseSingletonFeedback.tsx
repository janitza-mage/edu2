import {useState} from "react";
import {sounds} from "../../sounds/sounds";
import {isFastMode} from "../App/developer";

export interface ExerciseSingletonFeedback {

    /**
     * Whether feedback is active, that is, colors should be displayed and input elements should be disabled.
     */
    active: boolean;

    /**
     * A CSS color string that is used to give feedback. Will be "fully transparent" when not active to simplify use.
     */
    color: string;

    /**
     * Gives feedback to the user.
     */
    fire(correct: boolean, onDelayFinished: () => void): void;

    /**
     * Hides feedback.
     */
    hide(): void;

}

const myRed = "#f88";
const myGreen = "#8f8";
const myTransparent = "rgba(0,0,0,0)";

/**
 * Used to give the user feedback about answering to an exercise (right or wrong) on a "singleton" channel that does
 * not allow to give multiple feedbacks simultaneously, nor to persist a feedback (e.g. a correct answer in a
 * multi-select choice exercise).
 */
export function useExerciseSingletonFeedback(): ExerciseSingletonFeedback {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState(myTransparent);

    function fire(correct: boolean, onDelayFinished: () => void) {
        setActive(previouslyActive => {
            if (previouslyActive) {
                // there is no "sane default" for handling the two onFinished() callbacks in this case
                console.error("fire(): feedback is already active");
            }
            return true;
        });
        if (correct) {
            setColor(myGreen);
            sounds.correct.play();
            setTimeout(onDelayFinished, isFastMode() ? 100 : 1000);
        } else {
            setColor(myRed);
            sounds.wrong.play();
            setTimeout(onDelayFinished, isFastMode() ? 100 : 500);
        }
    }
    
    function hide() {
        setActive(false);
        setColor(myTransparent);
    }

    return {
        active,
        color,
        fire,
        hide,
    };
}
