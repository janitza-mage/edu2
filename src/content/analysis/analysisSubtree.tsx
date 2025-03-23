import {ContentNode} from "../types";
import React from "react";
import {ProblemAccordion, ProblemAccordionSection} from "../../components/ProblemAccordion/ProblemAccordion";
import {induktionSubtree} from "./induktion/induktionSubtree";

export const anaysisSubtree: ContentNode = {
    id: "analysis",
    name: "Analysis",
    type: "folder",
    children: [
        induktionSubtree,
        {
            id: "eins",
            name: "Eins",
            type: "problem",
            instantiate(): React.ReactElement {
                return <ProblemAccordion>
                    <ProblemAccordionSection title={"eins"} defaultExpanded>
                        eins bla
                    </ProblemAccordionSection>
                    <ProblemAccordionSection title={"zwei"}>
                        zwei bla
                    </ProblemAccordionSection>
                </ProblemAccordion>;
            },
        },
    ],
};
