import {ReactNode} from "react";
import {UnitStep} from "../step/createSteppedUnit";
import {
    ImmediateFeedbackChoiceExercise,
    ImmediateFeedbackChoiceExerciseItem, ImmediateFeedbackChoiceExerciseVariant
} from "./ImmediateFeedbackChoiceExercise";
import {getShuffled} from "../../util/random/getShuffled";
import {CenteredContent} from "../../components/layout/CenteredContent";

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
    return props => <CenteredContent widthPercent={parameters.widthPercent ?? 75}>
        <ImmediateFeedbackChoiceExercise
            onProgress={props.onProgress}
            onMistake={props.onMistake}
            onFinishStep={props.onFinishStep}
            title={parameters.title}
            items={orderedItems}
            variant={parameters.variant}
        />
    </CenteredContent>;
}

export function createShuffledSingleChoiceStep(
    title: ReactNode,
    correctLabel: ReactNode,
    wrongLabels: ReactNode[],
    additionalParameters?: Omit<CreateChoiceStepParameters, "title"|"shuffle"|"items">,
): UnitStep {
    return createChoiceStep({
        ...(additionalParameters ?? {}),
        title,
        shuffle: true,
        items: [
            {label: correctLabel, correct: true},
            ...wrongLabels.map(label => ({label, correct: false})),
        ],
    });
}
