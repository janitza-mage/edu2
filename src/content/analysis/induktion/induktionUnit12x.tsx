import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit12x = [
    createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
        createReadStep({
            content: <pre>
    (random formeln -{">"} Induktionsanfang wählen, Induktionsschritt wählen, Induktionsschritt beweisen)
                </pre>,
        }),
    ]),
    createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
        createReadStep({
            content: <pre>
    (das gleiche mit Timer)
                </pre>,
        }),
    ]),
];
