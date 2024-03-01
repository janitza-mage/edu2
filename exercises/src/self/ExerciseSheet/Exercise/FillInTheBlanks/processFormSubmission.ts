import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../common/types/Exercise";
import {getAllChoicesFromChoiceVariable} from "../../../common/types/FillInTheBlanksVariable";

export function processFormSubmission(props: ExerciseComponentProps<FillInTheBlanksExercise>, form: HTMLFormElement) {
    const formData = Object.fromEntries(new FormData(form));
    let right = true;
    for (let i = 0; i < props.exercise.variables.length; i++) {
        const variable = props.exercise.variables[i];
        switch (variable.type) {
            case "text": {
                const answer = ((formData[variable.name] ?? "") as string).trim();
                if (answer !== variable.expected) {
                    right = false;
                }
                break;
            }

            case "choice":
                const choices = getAllChoicesFromChoiceVariable(variable);
                const chosenValue = formData[variable.name];
                // we don't properly parse chosenValue, but if it is invalid, then this condition will be false
                if (choices[chosenValue as unknown as number] !== variable.rightChoice) {
                    right = false;
                }
                break;

            default:
                throw new Error(`unknown variable type: ${(variable as any).type}`);
        }
    }
    props.reportResult(right);
}
