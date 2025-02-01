import {UnitStep} from "./createSteppedUnit";
import {createIndexArray} from "../../util/createIndexArray";
import {flatten} from "../../util/flatten";

export function createLoopedSteps(n: number, factory: (i: number) => UnitStep | UnitStep[]) {
    return flatten(createIndexArray(n).map(factory).map(x => Array.isArray(x) ? x : [x]));
}
