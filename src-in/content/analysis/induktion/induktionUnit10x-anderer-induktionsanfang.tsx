import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit10x = [
    createSteppedUnit("anderer-induktionsanfang-1", "Induktionsanfang >1", () => [
        createReadStep({
            content: <pre>
    Der Induktionsanfang war immer bei n=1.
    Man kann jede Zahl als Induktionsanfang nehmen, aber dann beweist man die ursprüngliche Aussage nur
    für alle n _ab dieser Zahl_.
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Summe(i=1..n)=n(n+1)/2
    Wenn man als Induktionsanfang n=3 setzt, dann beweist man:
    ---1         = 1--- (durchgestrichen)
    ---1+2       = 3--- (durchgestrichen)
    1+2+3     = 6
    1+2+3+4   = 10
    1+2+3+4+5 = 15
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Achtung, erster Fallstrick: Wir haben _nicht_ die Aussage verändert, dass die Summe der ersten n Zahlen gleich n(n+1)/2 ist.
    also _nicht_ etwa: Summe(i=3..n)=n(n+1)/2
    Das wäre eine andere Aussage, die auch nicht stimmt.
    Was wir stattdessen gemacht haben, ist, diese Aussage nicht mehr für alle n, sondern nur noch für "fast alle n"
        zu beweisen.
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Wie lautet der Induktionsanfang ab 3?
        Summe(i=1..3)=3(3+1)/2
        Summe(i=3..n)=n(n+1)/2
        Summe(i=3..3)=3(3+1)/2
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Achtung, zweiter Fallstrick: Wenn wir den Induktionsanfang festlegen, dann besagt das, dass die Aussage für alle n ab
    diesem Anfang gilt.
    Damit ist aber _offen_, ob die Aussage für kleinere n gilt oder nicht. Es gibt keine Verpflichtung, dass die
    Aussage für kleinere n falsch ist.
                </pre>,
        }),
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
        createReadStep({
            content: <pre>
    Für alle n ab n=5 ist die Summe der ersten n Zahlen größer als 12.
    Tabelle mit n = 1..6
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
];
