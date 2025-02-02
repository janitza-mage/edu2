import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit6 = createSteppedUnit("summeUngerade", "Summe der ersten n ungeraden Zahlen", () => [
    createReadStep({
        content: <pre>
Es soll gezeigt werden:
Die Summe der ersten n ungeraden Zahlen ist n^2
    1             = 1
    1 + 3         = 4
    1 + 3 + 5     = 9
    1 + 3 + 5 + 7 = 16
    Summe(i=1..n)(2i-1) = n^2
            </pre>,
    }),
    createReadStep({
        content: <pre>
Die Summe der ersten n ungeraden Zahlen ist n^2
Ü Was ist die Summe der ersten 100 ungeraden Zahlen?
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i-1) = n^2
Zur Erinnerung aus dem Grundkurs: Die Indizes i und n sind _nicht_ die ungeraden Zahlen selbst, sondern nummerieren
diese durch. Die i-te ungerade Zahl hat den Wert (2i-1):
(tabelle)
    i       2i-1
    1       1
    2       3
    3       5
    4       7
            </pre>,
    }),
    createReadStep({
        content: <pre>
Die i-te ungerade Zahl hat den Wert (2i-1).
Ü Was ist der Wert der 100. ungeraden Zahl?
            </pre>,
    }),
    createReadStep({
        content: <pre>
Es soll gezeigt werden:
    Summe(i=1..n)(2i-1) = n^2
Ü Wie lautet diese Aussage für n=100?
    folgt Summe(i=1..100)(2i-1) = 100^2
    (statt multiple choice mal aus Bausteinen zusammenpuzzeln?)
            </pre>,
    }),
]);
