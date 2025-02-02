import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {CenterBlock} from "../../../components/layout/CenterBlock";
import {createNumberKeyboardExercise} from "../../../unit/numbers/createNumberKeyboardExercise";
import {noFadeStep} from "../../../unit/step/noFadeStep";
import {createNumberKeyboardLayoutReadStep} from "../../../unit/numbers/createNumberKeyboardLayoutReadStep";

export const induktionUnit1 = createSteppedUnit("summeN", "Summe der ersten n Zahlen", () => [
    createReadStep({
        content: <div>
            <p>Die Summe der ersten {mathSpan("n")} Zahlen ist {mathSpan("#frac{n(n+1)}{2}")}.</p>
            <p>
                <div>Beispiel {mathSpan("n = 3")}:</div>
                <div>{mathDiv("1 + 2 + 3 = 6")}</div>
                <div>{mathDiv("#frac{3#cdot 4}{2} = 6")}</div>
            </p>
        </div>,
    }),
    createReadStep({
        content: <CenterBlock widthPercent={60}>
            <table className={"thinTable"} style={{width: "100%"}}>
                <thead>
                <tr>
                    <th>{mathSpan("n")}</th>
                    <th>{mathSpan("1+...+n")}</th>
                    <th>{mathSpan("#frac{n(n+1)}{2}")}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>6</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>15</td>
                    <td>15</td>
                </tr>
                </tbody>
            </table>
        </CenterBlock>,
    }),
    createReadStep({
        content: <>
            {mathDiv("1+2+...+n = #frac{n(n+1)}{2}")}
            <div>Mit der Summenschreibweise aus dem Grundkurs:</div>
            {mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2}")}
        </>,
    }),
    createNumberKeyboardExercise({
        body: input => <>
            <div>Berechne die Summe der ersten 1000 Zahlen.</div>
            {mathDiv("#sum_{i=i}^{1000} = #textcolor{blue}{" + (input || "?") + "}")}
        </>,
        correct: 500 * 1001,
    }),
    noFadeStep(createNumberKeyboardLayoutReadStep({
        content: <>
            <div>Berechne die Summe der ersten 1000 Zahlen.</div>
            {mathDiv("#sum_{i=i}^{1000} = 500500")}
        </>,
    })),
]);
