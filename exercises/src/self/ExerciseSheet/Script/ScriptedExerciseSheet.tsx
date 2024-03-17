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
        const libraryResult = (new Function(props.courseScriptLibrary))();
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
        (new Function("context", "courseLibrary", props.script))(context, libraryResult);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- we cannot just re-run the script, and those props don't change for exactly that reason
    return <>{sheetContent}</>;
}
