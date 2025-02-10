import {Unit, UnitInstanceProps} from "../../content/types";
import {ReactElement, useState} from "react";
import {FadeIn} from "../../components/effects/FadeIn";

export interface StepInstanceProps {
    onProgress: () => void;
    onMistake: () => void;
    onFinishStep: () => void;
}

export interface StepMetadata {
    fadeIn?: boolean;
}

export type UnitStep = ((props: StepInstanceProps) => ReactElement) & StepMetadata;

export function createSteppedUnitInstance(steps: UnitStep[]) {
    return (props: UnitInstanceProps) => {
        const [currentStepIndex, setCurrentStepIndex] = useState(0);
        const CurrentStep = steps[currentStepIndex];

        function onProgress() {
            props.onProgress();
        }

        function onMistake() {
            props.onMistake();
        }

        function onFinishStep() {
            const nextIndex = currentStepIndex + 1;
            if (nextIndex < steps.length) {
                setCurrentStepIndex(nextIndex);
            } else {
                props.onFinish();
            }
        }

        return <FadeIn key={currentStepIndex} delay={(CurrentStep.fadeIn ?? true) ? 0 : false}>
            <CurrentStep
                key={currentStepIndex}
                onProgress={onProgress}
                onMistake={onMistake}
                onFinishStep={onFinishStep}
            />
        </FadeIn>;
    };
}

export function createSteppedUnit(id: string, name: string, stepsFactory: () => UnitStep[]): Unit {
    return {
        id,
        name,
        type: "unit",
        instantiate: () => createSteppedUnitInstance(stepsFactory()),
    };
}

export function copyStepMetadata(from: UnitStep, to: UnitStep): void {
    to.fadeIn = from.fadeIn;
}
