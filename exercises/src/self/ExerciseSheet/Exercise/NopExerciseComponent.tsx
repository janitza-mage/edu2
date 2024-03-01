import {Button} from "@mui/material";
import {ExerciseComponentProps} from "./ExerciseComponentProps";
import {NopExercise} from "../../../common/types/Exercise";

/**
 * This exercise just asks the user to confirm that he/she has read the unit. It is used for units that do not have
 * any exercises. We do not auto-submit the exercise because, while having to click a button is annoying, auto-submit
 * would be very confusing because the user still has to "solve" all units _in the correct order_ because we cannot
 * save the score of lookahead units, and even if we could, the whole course wouldn't count as completed until
 * all units have been completed. So clicking a button is the "less bad" option.
 *
 * On the other hand, this button also acts as a reminder to the author that units without an exercise aren't the way
 * this app is supposed to be used.
 */
export function NopExerciseComponent(props: ExerciseComponentProps<NopExercise>) {
    return <div>
        <Button variant="contained" disabled={props.answered} onClick={() => props.reportResult(true)}>Confirm</Button>
    </div>;
}
