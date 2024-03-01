import {backendGet} from "../util/backendGet";
import {FullWidthLoadingIndicator} from "../LoadingIndicator/FullWidthLoadingIndicator";
import {ExerciseDefinitionSwitch} from "./ExerciseDefinitionSwitch";
import {GetExerciseResponse} from "../../common/frontend-api/GetExerciseResponse";
import {exerciseDefinitionSchema} from "../../common/types/ExerciseDefinition";
import {getErrorMessage} from "../../common/util/getErrorMessage";
import {useLoader} from "../../uilib/util/useLoader";

export interface ExerciseSheetProps {
    courseId: number;
    unitIndex: number;
}

async function loadExercise(props: ExerciseSheetProps): Promise<GetExerciseResponse> {
    const response = (await backendGet(`getExercise/${props.courseId}/${props.unitIndex}`)) as GetExerciseResponse;
    try {
        exerciseDefinitionSchema.parse(response.exerciseDefinition);
    } catch (error) {
        console.error("invalid exercise definition", error, response);
        throw new Error(`invalid exercise definition: ${getErrorMessage(error)}`);
    }
    return response;
}

export function ExerciseSheet(props: ExerciseSheetProps) {
    const loader = useLoader(() => loadExercise(props));
    return <FullWidthLoadingIndicator loader={loader}>
        {(result) => <ExerciseDefinitionSwitch
            exerciseDefinition={result.exerciseDefinition}
            exerciseScript={result.exerciseScript}
            courseScriptLibrary={result.courseScriptLibrary}
        />}
    </FullWidthLoadingIndicator>;
}
