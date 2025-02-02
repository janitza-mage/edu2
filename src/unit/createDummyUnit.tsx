import {createSteppedUnit} from "./step/createSteppedUnit";
import {createReadStep} from "./read/createReadStep";

/**
 * Used e.g. as a temporary separator in the unit list.
 */
export function createDummyUnit(text: string) {
    return createSteppedUnit("dummy" + Math.random(), text, () => [createReadStep({content: "dummy"})]);
}
