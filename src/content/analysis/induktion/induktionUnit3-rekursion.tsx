import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit3 = createSteppedUnit("rekursion", "Bezug auf das vorherige Teilergebnis", () => [
    createReadStep({
        content: <pre>
            Rechnerisch ist es schnell zu aufwändig, 1+2+...+n zu berechnen.
            Die Rechnung lässt sich abkürzen, indem man sich auf das vorherige Ergebnis bezieht.
            1+2+3+4+5 = 15
        </pre>,
    }),
    createReadStep({
        content: <pre>
            1+2+3+4+5 = 15
            1+2+3+4+5+6 = 15 + 6 = 21
            1+...+7 = 21 + 7 = 28
            Mit der Summenschreibweise aus dem Grundkurs:
            Summe(i=1..n)i = (Summe(i=1..n-1)i) + n
        </pre>,
    }),
    createReadStep({
        content: <pre>
            Ü Die Summe der ersten 199 Zahlen ist ___. Wie groß ist der Summe der ersten 200 Zahlen?
                (Lösungsweg einblenden)
        </pre>,
    }),
]);
