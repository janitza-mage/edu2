import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {createNumberKeyboardExercise} from "../../../unit/numbers/createNumberKeyboardExercise";
import {createNumberKeyboardLayoutReadStep} from "../../../unit/numbers/createNumberKeyboardLayoutReadStep";
import {noFadeStep} from "../../../unit/step/noFadeStep";

export const induktionUnit3 = createSteppedUnit("rekursion", "Bezug auf das vorherige Teilergebnis", () => [
    createReadStep({
        content: <>
            <p>
                Rechnerisch ist es schnell zu aufwändig,
            </p>
            {mathDiv("1+2+...+n")}
            <p>
                zu berechnen. Die Rechnung lässt sich abkürzen, indem man sich auf das vorherige Ergebnis bezieht.
            </p>
        </>,
    }),
    createReadStep({
        content: <>
            <div>Beispiel:</div>
            <div>{mathDiv("#sum_{i=1}^{10}i = 55")}</div>
            <div>{mathDiv("#sum_{i=1}^{11}i = #sum_{i=1}^{10}i + 11 = 66")}</div>
        </>,
    }),
    createNumberKeyboardExercise({
        body: input => <>
            <p>
                Die Summe der ersten {mathSpan("199")} Zahlen ist {mathSpan("19900")}. Wie groß ist der Summe der
                ersten 200 Zahlen?
            </p>
            <p>
                {mathDiv("#sum_{i=1}^{200}i = #sum_{i=1}^{199}i + 200 = #textcolor{blue}{" + (input || "?") + "}")}
            </p>
        </>,
        correct: 20100,
    }),
    noFadeStep(createNumberKeyboardLayoutReadStep({
        content: <>
            <p>
                Die Summe der ersten {mathSpan("199")} Zahlen ist {mathSpan("19900")}. Wie groß ist der Summe der
                ersten 200 Zahlen?
            </p>
            <p>
                {mathDiv("#sum_{i=1}^{200}i = #sum_{i=1}^{199}i + 200 = 20100")}
            </p>
        </>,
    })),
]);
