import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {
    ImmediateFeedbackChoiceExercise,
    ImmediateFeedbackChoiceExerciseItem, ImmediateFeedbackChoiceExerciseVariant
} from "./ImmediateFeedbackChoiceExercise";
import {getShuffled} from "../../util/random/getShuffled";

export interface CreateChoiceStepParameters {
    title: ReactNode;
    items: ImmediateFeedbackChoiceExerciseItem[];
    widthPercent?: number | undefined | null;
    shuffle: boolean;
    // TODO: delayed feedback option for multi-select choice exercises
    variant?: ImmediateFeedbackChoiceExerciseVariant;
}

export function createChoiceStep(parameters: CreateChoiceStepParameters): UnitStep {
    const orderedItems = parameters.shuffle ? getShuffled(parameters.items) : parameters.items;
    return props => <ImmediateFeedbackChoiceExercise
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
        title={parameters.title}
        items={orderedItems}
        widthPercent={parameters.widthPercent}
        variant={parameters.variant}
    />;
}
