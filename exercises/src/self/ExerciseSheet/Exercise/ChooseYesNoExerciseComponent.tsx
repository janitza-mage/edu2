import {ExerciseComponentProps} from "./ExerciseComponentProps";
import {ChooseYesNoExercise} from "../../common/types/Exercise";
import {ChooseOneHelper, TaggedAnswer} from "./ChooseOneHelper";

export function ChooseYesNoExerciseComponent(props: ExerciseComponentProps<ChooseYesNoExercise>) {
    const taggedAnswers: TaggedAnswer[] = [
        {content: "Yes", correct: props.exercise.rightAnswer},
        {content: "No", correct: !props.exercise.rightAnswer}
    ];
    return <ChooseOneHelper
        answers={taggedAnswers}
        answered={props.answered}
        reportResult={props.reportResult}
    />;
}
