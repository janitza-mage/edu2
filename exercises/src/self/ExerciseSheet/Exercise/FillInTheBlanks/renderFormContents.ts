import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../common/types/Exercise";
import {renderMarkdown} from "../../../util/renderMarkdown";
import {getAllChoicesFromChoiceVariable} from "../../../common/types/FillInTheBlanksVariable";

export function renderFormContents(props: ExerciseComponentProps<FillInTheBlanksExercise>): string {
    const { exercise, answered } = props;
    let stencilHtml = renderMarkdown(exercise.stencil);
    for (let i = 0; i < exercise.variables.length; i++) {
        const variable = exercise.variables[i];
        switch (variable.type) {
            case "text": {
                const typeAttribute = variable.subtype === "number" ? "number" : "text";
                stencilHtml = stencilHtml.replace(
                    `((:${variable.name}))`,
                    `<input type="${typeAttribute}" name="${variable.name}" ${answered ? "disabled=\"disabled\"" : ""} />`,
                );
                break;
            }

            case "choice": {
                const defaultHtml = `<option value="-1">-- choose --</option>`;
                const choicesHtml = getAllChoicesFromChoiceVariable(variable).map((choice, i) =>
                    `<option value="${i}">${choice}</option>`).join("");
                stencilHtml = stencilHtml.replace(
                    `((:${variable.name}))`,
                    `<select name="${variable.name}" ${answered ? "disabled=\"disabled\"" : ""} />${defaultHtml}${choicesHtml}</select>`,
                );
                break;
            }

            default:
                throw new Error(`unknown variable type: ${(variable as any).type}`);
        }
    }
    return stencilHtml;
}
