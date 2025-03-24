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
];
