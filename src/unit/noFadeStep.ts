import {UnitStep} from "./createSteppedUnit";

export function noFadeStep(step: UnitStep): UnitStep {
    const result: UnitStep = props => step(props);
    result.fadeIn = false;
    return result;
}
