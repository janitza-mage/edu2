import {ContentNode} from "../types";
import {createSteppedUnit} from "../../unit/createSteppedUnit";
import {createLoopedSteps} from "../../unit/createLoopedSteps";
import {createReadStep} from "../../unit/createReadStep";

export const experimentTree: ContentNode = {
    id: "experiment",
    name: "Experiment",
    type: "folder",
    isolatedChildren: true,
    children: [
        {
            id: "finja",
            name: "Finja",
            type: "folder",
            isolatedChildren: true,
            children: [
                createSteppedUnit("minus10", "Minusaufgaben bis 10", () => createLoopedSteps(3, i => {
                    if (i == 2) {
                        return createLoopedSteps(2, i => createReadStep({
                            content: <div>nested: {i}</div>
                        }));
                    } else {
                        return createReadStep({
                            content: <div>top: {i}</div>
                        });
                    }
                })),
            ],
        },        
    ],
};
