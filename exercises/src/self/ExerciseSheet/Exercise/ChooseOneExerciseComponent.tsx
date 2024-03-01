import {ExerciseComponentProps} from "./ExerciseComponentProps";
import {useState} from "react";
import {shuffleInPlace} from "../../../common/util/shuffleInPlace";
import {ChooseOneExercise} from "../../../common/types/Exercise";
import {ChooseOneHelper, TaggedAnswer} from "./ChooseOneHelper";

export function ChooseOneExerciseComponent(props: ExerciseComponentProps<ChooseOneExercise>) {

    // compute tagged answers, but only once (on first render) to keep the order stable
    const [taggedAnswers] = useState<TaggedAnswer[]>(() => {
        const taggedCorrectAnswer: TaggedAnswer = {content: props.exercise.rightAnswer, correct: true};
        const taggedWrongAnswers: TaggedAnswer[] = props.exercise.wrongAnswers.map(a => ({content: a, correct: false}));
        const taggedAnswers: TaggedAnswer[] = [taggedCorrectAnswer, ...taggedWrongAnswers];
        shuffleInPlace(taggedAnswers);
        return taggedAnswers;
    });

    return <ChooseOneHelper
        authorId={props.authorId}
        answers={taggedAnswers}
        answered={props.answered}
        reportResult={props.reportResult}
    />;
}
