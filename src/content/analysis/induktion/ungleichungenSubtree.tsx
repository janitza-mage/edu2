import React from "react";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {ContentNode} from "../../types";
import {ProblemAccordion, ProblemAccordionSection} from "../../../components/ProblemAccordion/ProblemAccordion";

export const ungleichungenSubtree: ContentNode = {
    id: "ungleichungen",
    name: "Ungleichungen",
    type: "folder",
    children: [
        {
            id: "summe-n-groesser",
            name: "Summe größer 12",
            type: "problem",
            instantiate(): React.ReactElement {
                return <ProblemAccordion>
                    <ProblemAccordionSection title={"Aufgabe"} defaultExpanded>
                        <p>Beweise mit Vollständiger Induktion:</p>
                        <p>Für alle {mathSpan("n")} ab {mathSpan("n=5")} ist die Summe der ersten {mathSpan("n")}
                            Zahlen größer als {mathSpan("12")}:</p>
                        <p>{mathDiv("#sum_{i=1}^{n}i > 12 #hskip 30pt n#ge 5")}</p>
                        <p>Verwende dabei <i>nicht</i> die Summenformel {mathSpan("#frac{n(n+1)}{2}")}.</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 1"}>
                        <p>Zeige zuerst den Induktionsanfang ({mathSpan("n=5")}):</p>
                        <p>{mathDiv("#sum_{i=1}^{5}i > 12")}</p>
                        <p>Zeige danach den Induktionsschritt:</p>
                        <p>{mathDiv("#sum_{i=1}^{n}i > 12 #Rightarrow #sum_{i=1}^{n+1}i > 12")}</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Tipp 2"}>
                        <p>Fange mit der Summe bis {mathSpan("(n+1)")} an. Spalte den {mathSpan("(n+1)")}-Term ab und
                            wende dann die schon bewiesene Aussage für {mathSpan("n")} auf die restliche Summe an.</p>
                        <p>Bei dieser Ungleichung (und vielen anderen) hilft es, Teile wegzulassen: Wenn
                            {mathSpan("a #ge 0")}, dann ist {mathSpan("b+a #ge b")}.</p>
                        <p>Ebenso gilt: Wenn {mathSpan("a > 0")}, dann ist {mathSpan("b+a > b")}.</p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Lösung"}>
                        <p>Induktionsanfang:</p>
                        <p>{mathDiv("#sum_{i=1}^{5}i = 1+2+3+4+5 = 15 > 12")}</p>
                        <p>Induktionsschritt:</p>
                        <p>
                            {mathDiv("#sum_{i=1}^{n+1}i")}
                            {mathDiv("= (#sum_{i=1}^{n}i) + (n+1)")}
                            {mathDiv("> 12 + (n+1)")}
                            {mathDiv("#ge 12")}
                        </p>
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"Erklärung zum Induktionsschritt"}>
                        <p>Gehe von der Summe der ersten {mathSpan("n+1")} Zahlen aus.</p>
                        <p>{mathDiv("#sum_{i=1}^{n+1}i")}</p>
                        <p>Spalte den {mathSpan("(n+1)")}-Term ab.</p>
                        <p>{mathDiv("= (#sum_{i=1}^{n}i) + (n+1)")}</p>
                        <p>Wende die schon bewiesene Aussage für die Summe der ersten {mathSpan("n")} Zahlen an.
                            Diese ist nach der Annahme im Induktionsschritt größer als {mathSpan("12")}, also muss die
                            gesamte Formel größer sein als eine Formel, wo man diesen Teil durch 12 ersetzt.</p>
                        <p>{mathDiv("> 12 + (n+1)")}</p>
                        <p>Der Teil {mathSpan("(n+1)")} ist für diesen Beweis unnötig und kann weggelassen werden --
                            das geht aber nur, weil wir wissen, dass (n+1) nicht negativ sein kann!</p>
                        <p>{mathDiv("#ge 12")}</p>
                    </ProblemAccordionSection>
                </ProblemAccordion>;
            },
        },
    ],
};
