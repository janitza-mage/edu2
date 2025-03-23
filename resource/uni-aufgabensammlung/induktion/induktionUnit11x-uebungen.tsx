import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit11x = [
    createSteppedUnit("anderer-induktionsanfang-uebungen-1", "Übungen (1)", () => [
        createReadStep({
            content: <pre>
        Beweise:
            Für alle n ab n=3 ist n^2{">"}2n
        Wie lautet der Induktionsanfang?
        ...
                    </pre>,
        }),
    ]),
];
