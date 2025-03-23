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
        createReadStep({
            content: <pre>
        Wie lautet der Induktionsschritt?
        ...
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst.
        ...
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
                    </pre>,
        }),
    ]),
    createSteppedUnit("anderer-induktionsanfang-uebungen-2", "Übungen (2)", () => [
        createReadStep({
            content: <pre>
    (random formeln -{">"} Induktionsanfang wählen, Induktionsschritt wählen, Induktionsschritt beweisen)
                </pre>,
        }),
    ]),
    createSteppedUnit("anderer-induktionsanfang-uebungen-3", "Übungen (3)", () => [
        createReadStep({
            content: <pre>
    (das gleiche mit Timer)
                </pre>,
        }),
    ]),
];
