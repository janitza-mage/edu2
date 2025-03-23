import React from "react";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {ContentNode} from "../../types";
import {ProblemAccordion, ProblemAccordionSection} from "../../../components/ProblemAccordion/ProblemAccordion";
import {TextSize} from "../../../components/layout/TextSize";

export const induktionSubtree: ContentNode = {
    id: "induktion",
    name: "Vollständige Induktion",
    type: "folder",
    children: [
        {
            id: "summe-i",
            name: "Summe der ersten n Zahlen",
            type: "problem",
            instantiate(): React.ReactElement {
                return <ProblemAccordion>
                    <ProblemAccordionSection title={"Aufgabe"} defaultExpanded>
                        <p>Beweise mit Vollständiger Induktion:</p>
                        <p>{mathDiv("#sum_{i=1}^{n}i = #frac{n(n+1)}{2}")}</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 1"}>
                        <p>Zeige zuerst den Induktionsanfang:</p>
                        <p>{mathDiv("#sum_{i=1}^{1}i = #frac{1#cdot(1+1)}{2}")}</p>
                        <p>Zeige danach den Induktionsschritt:</p>
                        <p><TextSize size={0.9}>{mathDiv("#sum_{i=1}^ni = #frac{n(n+1)}{2} #Rightarrow #sum_{i=1}^{n+1}i = #frac{(n+1)(n+2)}{2}")}</TextSize></p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 2"}>
                        <p>Fange mit der Summe bis {mathSpan("(n+1)")} an. Spalte den {mathSpan("(n+1)")}-Term ab und
                        wende dann die schon bewiesene Aussage für {mathSpan("n")} auf die restliche Summe an.</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Lösung"}>
                        <p>Induktionsanfang:</p>
                        <p>{mathDiv("#sum_{i=1}^{1}i = 1 = #frac{1#cdot(1+1)}{2}")}</p>
                        <p>Induktionsschritt:</p>
                        <TextSize size={0.8}><p>
                            {mathDiv("#sum_{i=1}^{n+1}i")}
                            {mathDiv("= (#sum_{i=1}^{n}i)+(n+1)")}
                            {mathDiv("= #frac{n(n+1)}{2}+(n+1)")}
                            {mathDiv("= #frac{n(n+1)}{2}+#frac{2(n+1)}{2}")}
                            {mathDiv("= #frac{n(n+1)+2(n+1)}{2}")}
                            {mathDiv("= #frac{(n+2)(n+1)}{2}")}
                            {mathDiv("= #frac{(n+1)(n+2)}{2}")}
                        </p></TextSize>
                    </ProblemAccordionSection>
                </ProblemAccordion>;
            },
        },
        {
            id: "summe-ungerade",
            name: "Summe der ersten n ungeraden Zahlen",
            type: "problem",
            instantiate(): React.ReactElement {
                return <ProblemAccordion>
                    <ProblemAccordionSection title={"Aufgabe"} defaultExpanded>
                        <p>Beweise mit Vollständiger Induktion:</p>
                        <p>{mathDiv("#sum_{i=1}^{n}(2i-1) = n^2")}</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 1"}>
                        <p>Zeige zuerst den Induktionsanfang:</p>
                        <p>{mathDiv("#sum_{i=1}^{1}(2i-1) = 1^2")}</p>
                        <p>Zeige danach den Induktionsschritt:</p>
                        <p><TextSize size={0.9}>{mathDiv("#sum_{i=1}^{n}(2i-1) = n^2 #Rightarrow #sum_{i=1}^{n+1}(2i-1) = (n+1)^2")}</TextSize></p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 2"}>
                        <p>Fange mit der Summe bis {mathSpan("(n+1)")} an. Spalte den {mathSpan("(n+1)")}-Term ab und
                            wende dann die schon bewiesene Aussage für {mathSpan("n")} auf die restliche Summe an.</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Lösung"}>
                        <p>Induktionsanfang:</p>
                        <p>{mathDiv("#sum_{i=1}^{1}(2i-1) = 1 = 1^2")}</p>
                        <p>Induktionsschritt:</p>
                        <TextSize size={0.8}><p>
                            {mathDiv("#sum_{i=1}^{n+1}(2i-1)")}
                            {mathDiv("= #sum_{i=1}^{n}(2i-1) + (2(n+1)-1)")}
                            {mathDiv("= n^2 + (2n + 2 - 1)")}
                            {mathDiv("= n^2 + 2n + 1")}
                            {mathDiv("= (n+1)^2")}
                        </p></TextSize>
                    </ProblemAccordionSection>
                </ProblemAccordion>;
            },
        },
    ],
};
