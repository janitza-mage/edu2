import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {TextSize} from "../../../components/layout/TextSize";

export const induktionUnit4 = createSteppedUnit("induktion", "Beweis durch Vollständige Induktion", () => [
    createReadStep({
        content: <>
            {mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2}")}
            <p>
                Die Formel kann man für ein beliebiges {mathSpan("n+1")} beweisen, indem man sich auf die schon
                bewiesene Formel für {mathSpan("n")} bezieht. Dieses Verfahren heißt <i>Vollständige Induktion</i>.
            </p>
            <p>
                Nur für das erste {mathSpan("n")} muss man die Formel auf einem anderen Weg beweisen.
            </p>
        </>,
    }),
    createReadStep({
        content: <>
            <p>
                <div><i>Induktionsanfang</i>: Beweise die Formel für {mathSpan("n=1")}:</div>
                {mathDiv("#sum_{i=1}^1i = #frac{1#cdot(1+1)}{2}")}
            </p>
            <p>
                <i>Induktionsschritt</i>: Sei {mathSpan("n #geq 1")} beliebig gewählt, aber dann fest (BAF). Beweise die
                Formel für {mathSpan("n+1")}. Verwende dabei die schon bewiesene Formel für {mathSpan("n")}.
                {mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2} #Rightarrow #sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")}
            </p>
        </>,
    }),
    createReadStep({
        content: <>
            <p>
                Die Vollständige Induktion funktioniert wie eine Reihe von Dominosteinen: Jeder Stein fällt um, weil
                der Stein davor umfällt (Induktionsschritt). Nur den ersten Stein muss man von Hand umwerfen
                (Induktionsanfang).
            </p>
            <p>
                (Bild: Dominoreihe; Hand stößt den ersten Stein um)
            </p>
        </>,
    }),
    createReadStep({
        content: <>
            <p>
                <div><i>Induktionsanfang</i>: Beweise die Formel für {mathSpan("n=1")}:</div>
                {mathDiv("#sum_{i=1}^1i = #frac{1#cdot(1+1)}{2}")}
            </p>
            <p>
                <div>Das ist einfach:</div>
                {mathDiv("#sum_{i=1}^1i = 1 = #frac{1#cdot(1+1)}{2}")}
            </p>
        </>,
    }),
    createReadStep({
        content: <>
            <p>
                <i>Induktionsschritt</i>: Beweise die Formel für {mathSpan("n+1")}. Verwende dabei die schon
                bewiesene Formel für {mathSpan("n")}.
                {mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2} #Rightarrow #sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")}
            </p>
            <p>
                <div>Man kann also jetzt davon ausgehen, dass</div>
                {mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2}")}
                <div>schon gilt. Unter dieser Annahme muss man zeigen, dass </div>
                {mathDiv("#sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")}
            </p>
        </>,
    }),
    createReadStep({
        content: <TextSize size={0.8}>
            <p>
                <i>Induktionsschritt</i>: Sei {mathSpan("n #geq 1")} beliebig gewählt, aber dann fest (BAF).
            </p>
            <p>
                {mathDiv("#sum_{i=1}^{n+1}i")}
                {mathDiv("= (#sum_{i=1}^{n}i)+(n+1)")}
                {mathDiv("= #frac{n(n+1)}{2}+(n+1)")}
                {mathDiv("= #frac{n(n+1)}{2}+#frac{2(n+1)}{2}")}
                {mathDiv("= #frac{n(n+1)+2(n+1)}{2}")}
                {mathDiv("= #frac{(n+2)(n+1)}{2}")}
                {mathDiv("= #frac{(n+1)(n+2)}{2}")}
            </p>
        </TextSize>,
    }),
    createReadStep({
        content: <>
            <p>
                Mit dem Induktionsanfang zeigt man die Aussage für {mathSpan("n=1")}.
            </p>
            <p>
                Mit dem Induktionsschritt und der bewiesenen Aussage für {mathSpan("n=1")} zeigt man die Aussage
                für {mathSpan("n=2")}.
            </p>
            <p>
                Mit dem Induktionsschritt und der bewiesenen Aussage für {mathSpan("n=2")} zeigt man die Aussage
                für {mathSpan("n=3")}.
            </p>
            <p>
                Mit dem Induktionsschritt und der bewiesenen Aussage für {mathSpan("n=3")} zeigt man die Aussage
                für {mathSpan("n=4")}.
            </p>
            <p>
                ...
            </p>
        </>,
    }),
]);
