import {ExerciseComponentProps} from "./ExerciseComponentProps";
import {NopExerciseComponent} from "./NopExerciseComponent";
import {DummyExerciseComponent} from "./DummyExerciseComponent";
import {ChooseOneExerciseComponent} from "./ChooseOneExerciseComponent";
import {
    ChooseOneExercise,
    ChooseYesNoExercise,
    DummyExercise,
    Exercise, FillInTheBlanksExercise,
    NopExercise
} from "../../common/types/Exercise";
import {ChooseYesNoExerciseComponent} from "./ChooseYesNoExerciseComponent";
import {FillInTheBlanksExerciseComponent} from "./FillInTheBlanks/FillInTheBlanksExerciseComponent";

export function ExerciseComponentSwitch(props: ExerciseComponentProps<Exercise>) {
    switch (props.exercise.type) {
        case "Nop":
            return <NopExerciseComponent {...props as ExerciseComponentProps<NopExercise>} />;
        case "Dummy":
            return <DummyExerciseComponent {...props as ExerciseComponentProps<DummyExercise>} />;
        case "ChooseOne":
            return <ChooseOneExerciseComponent {...props as ExerciseComponentProps<ChooseOneExercise>} />;
        case "ChooseYesNo":
            return <ChooseYesNoExerciseComponent {...props as ExerciseComponentProps<ChooseYesNoExercise>} />;
        case "FillInTheBlanks":
            return <FillInTheBlanksExerciseComponent {...props as ExerciseComponentProps<FillInTheBlanksExercise>} />;
        default:
            throw new Error("unknown exercise type: " + (props.exercise as any).type);
    }
}
