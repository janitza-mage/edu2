import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit12x = [
    createSteppedUnit("fakultaet", "Fakultät", () => [
        createReadStep({
            content: <pre>
    Die _Fakultät_, geschrieben n!, ist definiert als
        n! = 1*2*...*n
    Beispiele
        (Tabelle: n, 1*2*...*n ausgeschrieben, n! berechnet)
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Berechne
    n! für n=1...5
                </pre>,
        }),
    ]),
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
    Wie lautet der Induktionsanfang?
    ...
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
        createReadStep({
            content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
                </pre>,
        }),
    ]),
];