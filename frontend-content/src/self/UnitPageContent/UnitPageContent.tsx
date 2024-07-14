import {backendGet} from "../util/backendGet";
import {ExerciseDefinitionSwitch} from "./ExerciseDefinitionSwitch";
import {GetUnitPageContentResponse} from "../../common/frontend-api/GetUnitPageContentResponse";
import {exerciseDefinitionSchema} from "../../common/types/ExerciseDefinition";
import {getErrorMessage} from "../../common/util/getErrorMessage";
import {useLoader} from "../../uilib/util/useLoader";
import {FullWidthLoadingIndicator} from "../../uilib-frontend/LoadingIndicator/FullWidthLoadingIndicator";
import {Markdown, MarkdownInline} from "../../uilib/markdown/Markdown";
import {useSearchParams} from "react-router-dom";
import {Alert, Button} from "@mui/material";
import {useState} from "react";
import {postContainerMessage} from "./Materialized/postContainerMessage";

export interface ExerciseSheetProps {
    courseId: number,
    unitIndex: number;
}

async function loadExercise(props: ExerciseSheetProps): Promise<GetUnitPageContentResponse> {
    const response = (await backendGet(`getUnitPageContent/${props.courseId}/${props.unitIndex}`)) as GetUnitPageContentResponse;
    try {
        exerciseDefinitionSchema.parse(response.exerciseDefinition);
    } catch (error) {
        console.error("invalid exercise definition", error, response);
        throw new Error(`invalid exercise definition: ${getErrorMessage(error)}`);
    }
    return response;
}

export function UnitPageContent(props: ExerciseSheetProps) {
    
    // unit progression state
    const [searchParams] = useSearchParams();
    const unitProgressionState = (searchParams.get("ups") ?? "active") as "active" | "lookahead" | "lookbehind";
    
    // exercise sheet success -- controls the completion button and reports to the parent frame
    const [exerciseSheetSuccess, setExerciseSheetSuccess] = useState<boolean | null>(null);
    const reportExerciseSheetSuccess = (success: boolean) => {
        console.log("reportExerciseSheetSuccess: ", success);
        setExerciseSheetSuccess(success);
    };
    const finishUnit = () => {
        console.log("finishUnit")
        postContainerMessage({type: "finish", success: !!exerciseSheetSuccess});
    };
    
    const loader = useLoader(() => loadExercise(props));
    return <FullWidthLoadingIndicator loader={loader}>
        {(result) => <>
            {unitProgressionState === "lookahead" && <Alert severity="error" sx={{alignItems: "center"}}>
                This unit cannot be completed yet because previous units have not been completed.
            </Alert>}
            {unitProgressionState === "lookbehind" && <Alert severity="success" sx={{alignItems: "center"}}>
                This unit has already been completed.
            </Alert>}
            <h1><MarkdownInline renderConfiguration={{courseIdForImages: null, allowDangerousProtocol: false}}>{result.title}</MarkdownInline></h1>
            <Markdown renderConfiguration={{courseIdForImages: props.courseId, allowDangerousProtocol: false}}>
                {result.description}
            </Markdown>
            <ExerciseDefinitionSwitch
                authorId={result.authorId}
                courseId={props.courseId}
                exerciseDefinition={result.exerciseDefinition}
                exerciseScript={result.exerciseScript}
                courseScriptLibrary={result.courseScriptLibrary}
                onExerciseSheetCompleted={reportExerciseSheetSuccess}
            />
            {exerciseSheetSuccess !== null && <>
                <hr/>
                <Button variant="contained" onClick={finishUnit}>
                    {(!exerciseSheetSuccess || unitProgressionState !== "active") ? "Repeat exercise" : "Continue to the next unit"}
                </Button>
            </>}
        </>}
    </FullWidthLoadingIndicator>;
}
