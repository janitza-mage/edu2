import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {DndTest} from "./dnd/DndTest";

/*
Idee: Kein voller Formeleditor, sondern nur drag n drop von Formelteilen in mehreren Zeilen. Nur lineares
Zusammenbauen -- ist besser als immer das gleiche und einfacher umzusetzen.

foo
= bar + baz
= abc + def

Dabei sind [foo, bar, baz, abc, def] die drag n droppable teile. 

 */


export const induktionUnit8 = createSteppedUnit("summeGerade", "Summe der ersten n geraden Zahlen", () => [
    props => <DndTest />,
    createReadStep({
        content: <pre>
Es soll gezeigt werden: Die Summe der ersten n geraden Zahlen ist (n^2+n)
Summe(i=1..n)(2i) = (n^2+n)
n=1: 2             = 2
n=2: 2 + 4         = 6
n=3: 2 + 4 + 6     = 12
n=4: 2 + 4 + 6 + 8 = 20
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i) = (n^2+n)
Ü Was ist die Summe der ersten 100 geraden Zahlen?
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i) = (n^2+n)
Ü 5x mit verschiedenen n's
    Wie lautet diese Aussage für n={"{"}a{"}"}?
    -{">"} Summe(i=1..{"{"}a{"}"})(2i) = {"{"}a{"}"}^2+{"{"}a{"}"}
            (statt multiple choice mal aus Bausteinen zusammenpuzzeln?)
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i) = (n^2+n)
Was ist der Induktionsanfang (n=1)?
    ... multiple choice
            </pre>,
    }),
    createReadStep({
        content: <pre>
Summe(i=1..n)(2i) = (n^2+n)
Was ist der Induktionsschrtt?
    ... multiple choice
    Summe(i=1..n)(2i) = (n^2+n) ={">"} Summe(i=1..n+1)(2i) = ((n+1)^2+(n+1))
            </pre>,
    }),
    createReadStep({
        content: <pre>
Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst
      Summe(i=1..n+1)(2i)
    = Summe(i=1..n)(2i) + 2(n+1)
    = (n^2 + n) + 2(n+1)
    = (n^2 + n) + (2n + 2)
    = (n^2 + 2n + 1) + (n + 1)
    = (n+1)^2 + (n+1)
            </pre>,
    }),
    createReadStep({
        content: <pre>
An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n benutzt? Klicke auf den richtigen Pfeil.
            </pre>,
    }),
]);
