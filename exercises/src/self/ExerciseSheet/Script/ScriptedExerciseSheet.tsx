import {ExerciseSheet, exerciseSheetSchema, makeExerciseSheetNonEmpty} from "../../../common/types/Exercise";
import {ReactNode, useEffect, useState} from "react";
import {MaterializedExerciseSheet} from "../Materialized/MaterializedExerciseSheet";
import {validate} from "../../util/validate";

export interface ScriptedExerciseSheetProps {
    authorId: number,
    courseId: number,
    script: string;
    courseScriptLibrary: string;
}

export function ScriptedExerciseSheet(props: ScriptedExerciseSheetProps) {
    const [sheetContent, setSheetContent] = useState<ReactNode>(null);
    useEffect(() => {
        // eslint-disable-next-line no-new-func -- found no information on how to fix this
        let libraryResult: unknown;
        try {
            libraryResult = (new Function(props.courseScriptLibrary))();
        } catch (error) {
            console.error("Error while executing course script library:", error);
            throw error;
        }
        const context = {
            showExerciseSheet: (exerciseSheet: ExerciseSheet) => {
                validate(exerciseSheetSchema, exerciseSheet, "generated exercise sheet");
                const nonEmptySheet = makeExerciseSheetNonEmpty(exerciseSheet);
                setSheetContent(<MaterializedExerciseSheet
                    authorId={props.authorId}
                    courseId={props.courseId}
                    exerciseSheet={nonEmptySheet}
                />);
            },
        };
        // TODO if a scripted exercise occurs in a non-scripted sheet then the courseLibrary will never be executed!
        // eslint-disable-next-line no-new-func -- found no information on how to fix this
        try {
            (new Function("context", "courseLibrary", props.script))(context, libraryResult);
        } catch (error) {
            console.error("Error while executing exercise sheet script:", error);
            throw error;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- we cannot just re-run the script, and those props don't change for exactly that reason
    return <>{sheetContent}</>;
}
