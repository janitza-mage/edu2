import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../common/types/Exercise";
import {renderMarkdown} from "../../../util/renderMarkdown";
import {ComponentState} from "./FillInTheBlanksExerciseComponent";

export function updateFormContents(
    state: ComponentState,
    props: ExerciseComponentProps<FillInTheBlanksExercise>,
): string {


    const { exercise, answered } = props;
    let stencilHtml = renderMarkdown(exercise.stencil);
    for (let i = 0; i < exercise.variables.length; i++) {
        const variable = exercise.variables[i];
        switch (variable.type) {
            case "text":
                stencilHtml = stencilHtml.replace(
                    `((:${variable.name}))`,
                    `<input type="text" name="${variable.name}" ${answered ? "disabled=\"disabled\"" : ""} />`,
                );
                break;
            case "choice":
                throw new Error("not yet implemented");
            default:
                throw new Error(`unknown variable type: ${(variable as any).type}`);
        }
    }
    return stencilHtml;
}
