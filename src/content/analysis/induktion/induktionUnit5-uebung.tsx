import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit5 = createSteppedUnit("induktion-uebung", "Übung", () => [
    createReadStep({
        content: <pre>
Es wurde mit Vollständiger Induktion bewiesen:
    Summe(i=1..n)i = n(n+1) / 2     für n€N
Der Induktionsanfang war, diese Aussage für n=1 zu zeigen.
            </pre>,
    }),
    createReadStep({
        content: <pre>
was war der Induktionsanfang?
    i=1
    n=1
    Summe(i=1..1)i = 1(1+1)/2
    Summe(i=1..n)i = n(n+1)/2
    Summe(i=1..n+1)i = (Summe(i=1..n)i + n
    Summe(i=1..n)i = n(n+1)/2 ={">"} Summe(i=1..n+1)i = (Summe(i=1..n)i + n
            </pre>,
    }),
    createReadStep({
        content: <pre>
Es wurde mit Vollständiger Induktion bewiesen:
    Summe(i=1..n)i = n(n+1) / 2     für n€N
Der Induktionsschritt war, diese Aussage für n+1 zu zeigen, wobei man aber verwenden konnte, dass die Aussage für
n schon bewiesen war.
Mit anderen Worten war zu zeigen: Wenn die Aussage für n gilt, dann folgt daraus, dass sie auch für n+1 gilt.
            </pre>,
    }),
    createReadStep({
        content: <pre>
was war der Induktionsschritt?
    (gleiche Auswahl)
            </pre>,
    }),
    createReadStep({
        content: <pre>
An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
          (Summe(i=1..n+1)i)
        = (Summe(i=1..n)i)+(n+1)
        = n(n+1)/2 + n+1
        = n(n+1)/2 + 2(n+1)/2
        = (n(n+1)+2(n+1))/2
        = (n+2)(n+1)/2
        = (n+1)(n+2)/2
(rechts daneben gekrümmte Pfeile von einer zeile in die nächste, zum anklicken)
            </pre>,
    }),
]);
