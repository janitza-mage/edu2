import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {mathInlineBlock, mathSpan} from "../../../components/Math/Math";
import {CenterInline} from "../../../components/layout/CenterInline";
import {createChoiceStep} from "../../../unit/choice/createChoiceStep";

export const induktionUnit5 = createSteppedUnit("induktion-uebung", "Übung", () => [
    createReadStep({
        content: <>
            <p>Es wurde mit Vollständiger Induktion bewiesen:</p>
            <p><CenterInline>{mathInlineBlock("#sum_{i=1}^ni = #frac{n(n+1)}{2}", 12)} für {mathSpan("n#in #N")}</CenterInline></p>
            <p>Der Induktionsanfang war, diese Aussage für {mathSpan("n=1")} zu zeigen.</p>
        </>,
    }),
    createChoiceStep({
        title: <>Was war für den Induktionsanfang ({mathSpan("n=1")}) zu beweisen? Wähle alle richtigen Antworten.</>,
        items: [
            {correct: true, label: mathSpan("#sum_{i=1}^1i = #frac{1(1+1)}{2}")},
            {correct: true, label: mathSpan("#sum_{i=1}^ni = #frac{n(n+1)}{2}")},
            {correct: false, label: mathSpan("i=1")},
            {correct: false, label: mathSpan("n=1")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}i = (#sum_{i=1}^ni) + (n+1)")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = #frac{n(n+1)}{2} #Rightarrow #sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")},
        ],
        shuffle: true,
    }),
    createReadStep({
        content: <>
            <p>Es wurde mit Vollständiger Induktion bewiesen:</p>
            <p><CenterInline>{mathInlineBlock("#sum_{i=1}^ni = #frac{n(n+1)}{2}", 12)} für {mathSpan("n#in #N")}</CenterInline></p>
            <p>Der Induktionsschritt war, diese Aussage für {mathSpan("n+1")} zu zeigen, wobei man aber verwenden
                konnte, dass die Aussage für {mathSpan("n")} schon bewiesen war.</p>
            <p>Mit anderen Worten war zu zeigen: Wenn die Aussage für {mathSpan("n")} gilt, dann folgt daraus,
                dass sie auch für {mathSpan("n+1")} gilt.</p>
        </>,
    }),
    
    // TODO
    // TODO
    // TODO
    
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
