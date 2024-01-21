import {Button} from "@mui/material";
import {ExerciseComponentProps} from "./ExerciseComponentProps";
import {Markdown} from "../../util/Markdown";
import {DummyExercise} from "../../common/types/Exercise";

/**
 * This exercise is only used for development. It shows to buttons to trigger the "right" and "wrong" grading states.
 */
export function DummyExerciseComponent(props: ExerciseComponentProps<DummyExercise>) {
    return <div>
        <br /><div><Button variant="contained" disabled={props.answered} onClick={() => props.reportResult(true)}>right</Button></div>
        <br /><div><Button variant="contained" disabled={props.answered} onClick={() => props.reportResult(false)}>wrong</Button></div>
    </div>;
}
