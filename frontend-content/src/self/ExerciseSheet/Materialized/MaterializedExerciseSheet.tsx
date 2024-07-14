import {NonEmptyExerciseSheet} from "../../../common/types/Exercise";
import {Fragment, useEffect, useState} from "react";
import {ExerciseComponentSwitch} from "../Exercise/ExerciseComponentSwitch";
import {postContainerMessage} from "./postContainerMessage";
import {AdjustContainerSizeScrollMode} from "../../../common/types/AdjustSizeScrollMode";
import {Markdown} from "../../../uilib/markdown/Markdown";
import {MarkdownRenderConfiguration} from "../../../uilib/markdown/renderMarkdown";

export interface MaterializedExerciseSheetProps {
    authorId: number;
    courseId: number;
    exerciseSheet: NonEmptyExerciseSheet;
}

export function MaterializedExerciseSheet(props: MaterializedExerciseSheetProps) {

    // Exercise progress. We're currently not showing a progress bar because it's not that useful and there isn't really
    // a good place to put it. We're currently counting any single error as a reason to repeat the exercise.
    // The length of this array is the number of answered exercises, and the values indicate whether the answer was
    // correct.
    const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);

    // sets the size of the enclosing iframe to the size of the content.
    function adjustContainerSize(scrollMode: AdjustContainerSizeScrollMode = "none") {
        postContainerMessage({type: "setHeight", height: document.documentElement.scrollHeight, scrollMode});
    }

    // scrolls the outer component around the growing iframe to the bottom.
    function scrollToBottom() {
        postContainerMessage({type: "scrollToBottom"});
    }

    // This function is called when the user answers an exercise. First, the index is checked; the UI should prevent
    // answering an exercise twice, but in case it happens, this function will just ignore it.
    //
    // Then, any exercise error is stored in the exerciseError flag. The exercise sheet can still be completed, but
    // will have to be repeated if there is an error. If this function gets called to answer the last exercise,
    // then a completion button will be shown that will either repeat the exercise sheet or advance to the next unit.
    function onReportResult(index: number, correct: boolean) {
        if (index === exerciseResults.length) {
            const newResults = [...exerciseResults, correct];
            setExerciseResults(newResults);
            setTimeout(() => {
                adjustContainerSize("oldBottom");
                if (newResults.length === props.exerciseSheet.length) {
                    const success = newResults.every(r => r);
                    postContainerMessage({type: "finish", success});
                }
            }, 10);
        }
    }

    // initial size after rendering
    useEffect(() => {
        setTimeout(() => {
            adjustContainerSize();
        }, 10);
    }, []);

    // JSX
    const markdownConfiguration: MarkdownRenderConfiguration = {
        courseIdForImages: props.courseId,
        allowDangerousProtocol: true,
    };
    return <>
        {props.exerciseSheet.map((exercise, index) => (index <= exerciseResults.length) && <Fragment key={index}>
            <hr/>
            <div><Markdown renderConfiguration={markdownConfiguration}>{exercise.description}</Markdown></div>
            <div style={index < exerciseResults.length ? {backgroundColor: exerciseResults[index] ? "#c0ffc0" : "#ffc0c0"} : {}}>
                <ExerciseComponentSwitch
                    authorId={props.authorId}
                    courseId={props.courseId}
                    key={index}
                    exercise={exercise}
                    answered={index < exerciseResults.length}
                    reportResult={(correct: boolean) => onReportResult(index, correct)}
                    adjustContainerSize={adjustContainerSize}
                    scrollToBottom={scrollToBottom}
                />
            </div>
            {index < exerciseResults.length && exercise.epilogue && <div>
                <Markdown renderConfiguration={markdownConfiguration}>{exercise.epilogue}</Markdown>
            </div>}
        </Fragment>)}
    </>;
}
