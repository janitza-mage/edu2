import {copyStepMetadata, UnitStep} from "./createSteppedUnit";
import {TextSize} from "../../components/layout/TextSize";

export function withTextSize(size: number, step: UnitStep): UnitStep {
    const result: UnitStep = props => <TextSize size={size}>{step(props)}</TextSize>;
    copyStepMetadata(step, result);
    return result;
}
