import {ContentNode} from "../types";
import {createSteppedUnit, UnitStep} from "../../unit/createSteppedUnit";
import {createLoopedSteps} from "../../unit/createLoopedSteps";
import {ReactNode} from "react";
import {NumberChoice20Exercise} from "./NumberChoice20Exercise";
import {getShuffled} from "../../util/random/getShuffled";

export function createNumbers20Exercise(title: ReactNode, answer: number): UnitStep {
    return props => <NumberChoice20Exercise
        onProgress={props.onProgress}
        onMistake={props.onMistake}
        onFinishStep={props.onFinishStep}
        title={title}
        answer={answer}
    />;
}

export const experimentTree: ContentNode = {
    id: "experiment",
    name: "Experiment",
    type: "folder",
    isolatedChildren: true,
    children: [
        {
            id: "f",
            name: "F",
            type: "folder",
            isolatedChildren: true,
            children: [
                /*
                createSteppedUnit("minus10", "Minusaufgaben bis 10", () => getShuffled(createLoopedSteps(10, limit => {
                    if (limit < 5) {
                        return [];
                    }
                    return createLoopedSteps(limit + 1, y => {
                        const x = limit - y;
                        return [
                            createNumbers20Exercise(<div>{limit} - {x} =</div>, y),
                            createNumbers20Exercise(<div>{limit} - {y} =</div>, x),
                        ];
                    });
                }))),
                 */
                createSteppedUnit("minus10", "Minusaufgaben bis 10", () => getShuffled(createLoopedSteps(10, limit => {
                    if (limit < 5) {
                        return [];
                    }
                    return createLoopedSteps(limit + 1, y => {
                        const x = limit - y;
                        return [
                            createNumbers20Exercise(<div>{limit} - {x} =</div>, y),
                            createNumbers20Exercise(<div>{limit} - {y} =</div>, x),
                        ];
                    });
                }))),
                
                
                // createSteppedUnit("minus10", "Minusaufgaben bis 10", () => getShuffled(createLoopedSteps(10, limit => {
                //     if (limit < 5) {
                //         return [];
                //     }
                //     return createLoopedSteps(limit + 1, y => {
                //         const x = limit - y;
                //         return [
                //             createNumbers20Exercise(<div>{limit} - {x} =</div>, y),
                //             createNumbers20Exercise(<div>{limit} - {y} =</div>, x),
                //         ];
                //     });
                // }))),
            ],
        },        
    ],
};
