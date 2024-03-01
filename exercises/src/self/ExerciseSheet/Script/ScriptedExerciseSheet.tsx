import {ExerciseSheet, exerciseSheetSchema, makeExerciseSheetNonEmpty} from "../../../common/types/Exercise";
import {ReactNode, useEffect, useState} from "react";
import {MaterializedExerciseSheet} from "../Materialized/MaterializedExerciseSheet";
import {validate} from "../../util/validate";

export interface ScriptedExerciseSheetProps {
    script: string;
    courseScriptLibrary: string;
}

export function ScriptedExerciseSheet(props: ScriptedExerciseSheetProps) {
    const [sheetContent, setSheetContent] = useState<ReactNode>(null);
    useEffect(() => {
        const libraryResult = (new Function(props.courseScriptLibrary))();
        const context = {
            showExerciseSheet: (exerciseSheet: ExerciseSheet) => {
                validate(exerciseSheetSchema, exerciseSheet, "generated exercise sheet");
                const nonEmptySheet = makeExerciseSheetNonEmpty(exerciseSheet);
                setSheetContent(<MaterializedExerciseSheet exerciseSheet={nonEmptySheet} />);
            },
        };
        (new Function("context", "courseLibrary", props.script))(context, libraryResult);
    }, []);
    return <>{sheetContent}</>;
}
