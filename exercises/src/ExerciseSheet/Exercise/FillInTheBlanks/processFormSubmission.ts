import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../common/types/Exercise";

export function processFormSubmission(props: ExerciseComponentProps<FillInTheBlanksExercise>, form: HTMLFormElement) {
    const formData = Object.fromEntries(new FormData(form));
    let right = true;
    for (let i = 0; i < props.exercise.variables.length; i++) {
        const variable = props.exercise.variables[i];
        switch (variable.type) {
            case "text":
                if (formData[variable.name] !== variable.expected) {
                    right = false;
                }
                break;
            case "choice":
                throw new Error("not yet implemented");
            default:
                throw new Error(`unknown variable type: ${(variable as any).type}`);
        }
    }
    props.reportResult(right);
}
