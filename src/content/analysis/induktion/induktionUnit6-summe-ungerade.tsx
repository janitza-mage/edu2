import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {MathTable} from "./MathTable";
import {createNumberKeyboardExercise} from "../../../unit/numbers/createNumberKeyboardExercise";
import {mathDiv, mathSpan} from "../../../components/Math/Math";

export const induktionUnit6 = createSteppedUnit("summeUngerade", "Summe der ersten n ungeraden Zahlen", () => [
    createReadStep({
        content: <>
            <p>Es soll gezeigt werden: Die Summe der ersten {mathSpan("n")} ungeraden Zahlen ist {mathSpan("n^2")}.</p>
            <p>
                <MathTable widthPercent={60} headers={["n", "1+3+...+(2n-1)", "n^2"]} cells={[
                    ["1", "1", "1"],
                    ["2", "1+3=4", "4"],
                    ["3", "1+3+5=9", "9"],
                    ["4", "1+3+5+7=16", "16"],
                    ["5", "1+3+5+7+9=25", "25"],
                ]} />
            </p>
        </>,
    }),
    createNumberKeyboardExercise({
        body: input => <>
            <p>Die Summe der ersten {mathSpan("n")} ungeraden Zahlen ist {mathSpan("n^2")}.</p>
            <p>Was ist die Summe der ersten 100 ungeraden Zahlen?</p>
            <p>{mathDiv("#sum_{i=1}^{100}(2i+1) = #textcolor{blue}{" + (input || "?") + "}")}</p>
        </>,
        correct: 10000,
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
