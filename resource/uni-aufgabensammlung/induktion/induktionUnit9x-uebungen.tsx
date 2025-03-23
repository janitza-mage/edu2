import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit9x = [
    createSteppedUnit("induktion-uebungen-3", "Übungen (3)", () => [
        createReadStep({
            content: <pre>
    Die Formeln werden jetzt komplizierter. Dafür gibt es jetzt kein Zeitlimit.
    - Summe der ersten n Quadratzahlen
    - Summe der ersten n geraden Quadratzahlen
    - Summe der ersten n Zweierpotenzen

                </pre>,
        }),
    ]),
];