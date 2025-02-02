import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit4 = createSteppedUnit("induktion", "Beweis durch Vollständige Induktion", () => [
    createReadStep({
        content: <pre>
Wir benutzen jetzt nur noch die Summenschreibweise aus dem Grundkurs:
    1+...+n = n(n+1)/2
    -{">"}
            Summe(i=1..n)i = n(n+1)/2
            </pre>,
    }),
    createReadStep({
        content: <pre>
Die Formel
kann man beweisen, indem man sich auf das vorherige Ergebnis bezieht.
Dieses Verfahren heißt _Vollständige Induktion_.
            </pre>,
    }),
    createReadStep({
        content: <pre>
Dazu muss man die Behauptung
    Summe(i=1..n)i = n(n+1)/2
für ein erstes n zeigen (Induktionsanfang).
Für n=1 ist
    (Summe(i=1..n)i) = 1 = 1(1+1)/2
            </pre>,
    }),
    createReadStep({
        content: <pre>
Danach muss man zeigen: Wenn die Behauptung für ein beliebiges n gilt, dann folgt daraus, dass sie auch
für n+1 gilt (Induktionsschritt).
Anders gesagt, muss man für ein beliebiges, vorgegebenes n die Formel
    (Summe(i=1..n)i)+(n+1) = (n+1)(n+2)/2
zeigen, kann aber die Annahme verwenden, dass die Formel
    Summe(i=1..n)i = n(n+1)/2
für _dieses_ n schon gezeigt wurde.
            </pre>,
    }),
    createReadStep({
        content: <pre>
Sei n _beliebig, aber dann fest_ (BAF). Dann ist
      (Summe(i=1..n+1)i)
    = (Summe(i=1..n)i)+(n+1)
    = n(n+1)/2 + n+1
    = n(n+1)/2 + 2(n+1)/2
    = (n(n+1)+2(n+1))/2
    = (n+2)(n+1)/2
    = (n+1)(n+2)/2
            </pre>,
    }),
    createReadStep({
        content: <pre>
Mit der vollständigen Induktion zeigt man die Aussage für n=1.
Aus der Aussage für n=1 folgt die Aussage für n=2.
Aus der Aussage für n=2 folgt die Aussage für n=3.
usw.
            </pre>,
    }),
]);
