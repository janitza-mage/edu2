import {NonEmptyExerciseSheet} from "../../common/types/Exercise";
import {Fragment, useEffect, useState} from "react";
import {ExerciseComponentSwitch} from "../Exercise/ExerciseComponentSwitch";
import {postContainerMessage} from "./postContainerMessage";
import {Markdown} from "../../util/Markdown";

export interface MaterializedExerciseSheetProps {
    exerciseSheet: NonEmptyExerciseSheet;
}

export function MaterializedExerciseSheet(props: MaterializedExerciseSheetProps) {

    // exercise progress. We're currently not showing a progress bar because it's not that useful and there isn't really
    // a good place to put it. We're currently counting any single error as a reason to repeat the exercise.
    const [exerciseProgress, setExerciseProgress] = useState<number>(0);
    const [exerciseError, setExerciseError] = useState(false);

    // sets the size of the enclosing iframe to the size of the content.
    function adjustContainerSize() {
        postContainerMessage({type: "setHeight", height: document.documentElement.scrollHeight});
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
        if (index === exerciseProgress) {
            setExerciseProgress(exerciseProgress + 1);
            if (!correct) {
                setExerciseError(true);
            }
            setTimeout(() => {
                adjustContainerSize();
                scrollToBottom();
                if (exerciseProgress + 1 === props.exerciseSheet.length) {
                    postContainerMessage({type: "finish", success: !exerciseError});
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
    return <>
        {props.exerciseSheet.map((exercise, index) => (index <= exerciseProgress) && <Fragment key={index}>
            <hr/>
            <div><Markdown>{exercise.description}</Markdown></div>
            <ExerciseComponentSwitch
                key={index}
                exercise={exercise}
                answered={index < exerciseProgress}
                reportResult={(correct: boolean) => onReportResult(index, correct)}
                adjustContainerSize={adjustContainerSize}
                scrollToBottom={scrollToBottom}
            />
            {index < exerciseProgress && exercise.epilogue && <div><Markdown>{exercise.epilogue}</Markdown></div>}
        </Fragment>)}
    </>;
}
