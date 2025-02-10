import {copyStepMetadata, UnitStep} from "./createSteppedUnit";

export function noFadeStep(step: UnitStep): UnitStep {
    const result: UnitStep = props => step(props);
    copyStepMetadata(step, result);
    result.fadeIn = false;
    return result;
}
