import React from "react";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {ContentNode} from "../../types";
import {ProblemAccordion, ProblemAccordionSection} from "../../../components/ProblemAccordion/ProblemAccordion";
import {TextSize} from "../../../components/layout/TextSize";

function summeAufgabe(
    id: string,
    name: string,
    aussage: string,
    anfangLinks: string,
    anfangRechts: string,
    anfangWert: string,
    schrittKurz: string,
    schrittLang: string[],
    schrittKurzTextSize?: number,
    schrittLangTextSize?: number,
): ContentNode {
    return {
        id,
        name,
        type: "problem",
        instantiate(): React.ReactElement {
            return <ProblemAccordion>
                <ProblemAccordionSection title={"Aufgabe"} defaultExpanded>
                    <p>Beweise mit Vollständiger Induktion:</p>
                    <p>{mathDiv(aussage)}</p>
                </ProblemAccordionSection>
                <ProblemAccordionSection title={"Tipp 1"}>
                    <p>Zeige zuerst den Induktionsanfang:</p>
                    <p>{mathDiv(anfangLinks + " = " + anfangRechts)}</p>
                    <p>Zeige danach den Induktionsschritt:</p>
                    <p><TextSize size={schrittKurzTextSize ?? 0.9}>{mathDiv(schrittKurz)}</TextSize></p>
                </ProblemAccordionSection>
                <ProblemAccordionSection title={"Tipp 2"}>
                    <p>Fange mit der Summe bis {mathSpan("(n+1)")} an. Spalte den {mathSpan("(n+1)")}-Term ab und
                        wende dann die schon bewiesene Aussage für {mathSpan("n")} auf die restliche Summe an.</p>
                </ProblemAccordionSection>
                <ProblemAccordionSection title={"Lösung"}>
                    <p>Induktionsanfang:</p>
                    <p>{mathDiv(anfangLinks + " = " + anfangWert + " = " + anfangRechts)}</p>
                    <p>Induktionsschritt:</p>
                    <TextSize size={schrittLangTextSize ?? 0.8}><p>
                        {schrittLang.map(mathDiv)}
                    </p></TextSize>
                </ProblemAccordionSection>
            </ProblemAccordion>;
        },
    };
}

export const induktionSubtree: ContentNode = {
    id: "induktion",
    name: "Vollständige Induktion",
    type: "folder",
    children: [
        summeAufgabe("summe-i", "Summe der ersten n Zahlen", "#sum_{i=1}^{n}i = #frac{n(n+1)}{2}",
            "#sum_{i=1}^{1}i", "#frac{1#cdot(1+1)}{2}", "1",
            "#sum_{i=1}^ni = #frac{n(n+1)}{2} #Rightarrow #sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}",
            [
                "#sum_{i=1}^{n+1}i",
                "= (#sum_{i=1}^{n}i)+(n+1)",
                "= #frac{n(n+1)}{2}+(n+1)",
                "= #frac{n(n+1)}{2}+#frac{2(n+1)}{2}",
                "= #frac{n(n+1)+2(n+1)}{2}",
                "= #frac{(n+2)(n+1)}{2}",
                "= #frac{(n+1)(n+2)}{2}",
            ],
        ),
        summeAufgabe("summe-ungerade", "Summe der ersten n ungeraden Zahlen", "#sum_{i=1}^{n}(2i-1) = n^2",
            "#sum_{i=1}^{1}(2i-1)", "1^2", "1",
            "#sum_{i=1}^{n}(2i-1) = n^2 #Rightarrow #sum_{i=1}^{n+1}(2i-1) = (n+1)^2",
            [
                "#sum_{i=1}^{n+1}(2i-1)",
                "= #sum_{i=1}^{n}(2i-1) + (2(n+1)-1)",
                "= n^2 + (2n + 2 - 1)",
                "= n^2 + 2n + 1",
                "= (n+1)^2",
            ],
        ),
        summeAufgabe("summe-gerade", "Summe der ersten n geraden Zahlen", "#sum_{i=1}^{n}2i = n^2 + n",
            "#sum_{i=1}^{1}2i", "1^2 + 1", "2",
            "#sum_{i=1}^{n}2i = n^2 + n #Rightarrow #sum_{i=1}^{n+1}2i = (n+1)^2 + (n+1)",
            [
                "#sum_{i=1}^{n+1}2i",
                "= (#sum_{i=1}^{n}2i) + 2(n+1)",
                "= (n^2 + n) + (2n + 2)",
                "= n^2 + 3n + 2",
                "= (n^2 + 2n + 1) + (n + 1)",
                "= (n+1)^2 + (n+1)",
            ],
        ),
        summeAufgabe("summe-quadratzahlen", "Summe der ersten n Quadratzahlen", "#sum_{i=1}^{n}i^2 = #frac{n(n+1)(2n+1)}{6}",
            "#sum_{i=1}^{1}i^2", "#frac{1#cdot(1+1)#cdot(2+1)}{6}", "1",
            "#sum_{i=1}^{n}i^2 = #frac{n(n+1)(2n+1)}{6} #Rightarrow #sum_{i=1}^{n+1}i^2 = #frac{(n+1)(n+2)(2(n+1)+1)}{6}",
            [
                "#sum_{i=1}^{n+1}i^2",
                "= (#sum_{i=1}^{n}i^2) + (n+1)^2",
                "= #frac{n(n+1)(2n+1)}{6} + #frac{6(n+1)^2}{6}",
                "= #frac{n+1}{6}(n(2n+1) + 6(n+1))",
                "= #frac{n+1}{6}(2n^2 + n + 6n + 6)",
                "= #frac{n+1}{6}(2n^2 + 7n + 6)",
                "= #frac{n+1}{6}(n + 2)(2n + 3)",
                "= #frac{(n+1)(n+2)(2(n+1)+1)}{6}",
            ],
            0.6, 0.6
        ),
    ],
};
