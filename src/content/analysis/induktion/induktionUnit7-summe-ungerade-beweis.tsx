import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit7 = createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
    createReadStep({
        content: <pre>
Es soll gezeigt werden:
    Summe(i=1..n)(2i-1) = n^2
Der Induktionsanfang ist, diese Aussage für n=1 zu zeigen.
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i-1) = n^2
Wie lautet die Aussage für n=1?
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i-1) = n^2
Der Induktionsschritt ist: Aus der Aussage für n folgt die Aussage für n+1
(Auswahl wie beim ersten Beweis)
            </pre>,
    }),
    createReadStep({
        content: <pre>
Induktionsschritt:
Summe(i=1..n)(2i-1) = n^2 ={">"} Summe(i=1..n+1)(2i-1) = (n+1)^2
Bringe die Beweisschritte in die richtige Reihenfolge:
  Summe(i=1..n+1)(2i-1)
= (Summe(i=1..n)(2i-1)) + 2(n+1)-1
= n^2 + 2n + 2 - 1
= n^2 + 2n + 1
= (n+1)^2
            </pre>,
    }),
    createReadStep({
        content: <pre>
An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n benutzt? Klicke auf den richtigen Pfeil.
            </pre>,
    }),
]);
