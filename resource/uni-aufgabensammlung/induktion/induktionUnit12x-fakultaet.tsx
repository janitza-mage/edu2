import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit12x = [
    createSteppedUnit("fakultaet-induktion", "Induktionsbeweis zur Fakultät", () => [
        createReadStep({
            content: <pre>
    Beweise:
        Für alle n ab n=4 ist n!{">"}2^n
    Beispiele:
        Tabelle mit n, n!, 2^n
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Wie lautet der Induktionsschritt?
        n! {">"} 2^n ={">"} (n+1)! {">"} 2^(n+1)
    ...
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst.
        (n+1)! = n!*(n+1) {">"} 2^n*(n+1) {">"} 2^n*2 = 2^(n+1)
    ...
                </pre>,
        }),
    ]),
];