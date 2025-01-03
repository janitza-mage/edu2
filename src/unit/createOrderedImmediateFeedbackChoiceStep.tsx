import {ReactNode} from "react";
import {UnitStep} from "./createSteppedUnit";
import {
    ImmediateFeedbackChoiceExercise, ImmediateFeedbackChoiceExerciseItem
} from "../components/ImmediateFeedbackChoiceExercise/ImmediateFeedbackChoiceExercise";

export interface CreateOrderedImmediateFeedbackChoiceStepParameters {
    title: ReactNode;
    items: ImmediateFeedbackChoiceExerciseItem[];
    widthPercent?: number | undefined | null;
}

export function createOrderedImmediateFeedbackChoiceStep(parameters: CreateOrderedImmediateFeedbackChoiceStepParameters): UnitStep {
    return props => <ImmediateFeedbackChoiceExercise
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
        title={parameters.title}
        items={parameters.items}
        widthPercent={parameters.widthPercent}
    />;
}
