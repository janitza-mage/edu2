import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit10x = [
    createSteppedUnit("anderer-induktionsanfang-1", "Induktionsanfang >1", () => [
        createReadStep({
            content: <pre>
    Für alle n ab n=10 ist n^2{">"}2n
    Beweis: Wie für die Aussage ab n=3, nur mit anderem Induktionsanfang.
    Wir haben die Aussage dann ab n=10 bewiesen.
    Wir haben offen gelassen, für welche n im Bereich 1..9 die Aussage gilt.
    Sie gilt z.B. f+r n=5, aber nicht für n=1.
                </pre>,
        }),
    ]),
    createSteppedUnit("anderer-induktionsanfang-2", "Anwendungsfälle", () => [
        createReadStep({
            content: <pre>
    Ein Induktionsanfang ab einer anderen Zahl als 1 ist sinnvoll, wenn die Aussage gar nicht für die ersten n gilt,
    sondern nur noch für die restlichen n.
    Beispiel:
    Für alle n ab n=5 ist die Summe der ersten n Zahlen größer als 12.
                </pre>,
        }),
    ]),
];
