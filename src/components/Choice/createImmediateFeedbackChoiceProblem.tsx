import {ReactNode} from "react";
import {
    ImmediateFeedbackChoiceProblem,
    ImmediateFeedbackChoiceProblemItem,
    ImmediateFeedbackChoiceProblemVariant
} from "./ImmediateFeedbackChoiceProblem";
import {getShuffled} from "../../util/random/getShuffled";
import {CenteredContent} from "../layout/CenteredContent";
import {Problem} from "../../problems/Problem";

export interface CreateImmediateFeedbackChoiceProblemParameters {
    title: ReactNode;
    items: ImmediateFeedbackChoiceProblemItem[];
    widthPercent?: number | undefined | null;
    shuffle: boolean;
    // TODO: delayed feedback option for multi-select choice exercises
    variant?: ImmediateFeedbackChoiceProblemVariant;
    onSelect?: (correct: boolean) => void;
}

export function createImmediateFeedbackChoiceProblem(parameters: CreateImmediateFeedbackChoiceProblemParameters): Problem {
    const orderedItems = parameters.shuffle ? getShuffled(parameters.items) : parameters.items;
    return props => <CenteredContent widthPercent={parameters.widthPercent ?? 95}>
        <ImmediateFeedbackChoiceProblem
            onFinish={props.onFinish}
            title={parameters.title}
            items={orderedItems}
            variant={parameters.variant}
            onSelect={parameters.onSelect}
        />
    </CenteredContent>;
}

export function createImmediateFeedbackChoiceProblemShuffled(
    title: ReactNode,
    correctLabel: ReactNode,
    wrongLabels: ReactNode[],
    additionalParameters?: Omit<CreateImmediateFeedbackChoiceProblemParameters, "title"|"shuffle"|"items">,
): Problem {
    return createImmediateFeedbackChoiceProblem({
        ...(additionalParameters ?? {}),
        title,
        shuffle: true,
        items: [
            {label: correctLabel, correct: true},
            ...wrongLabels.map(label => ({label, correct: false})),
        ],
    });
}
