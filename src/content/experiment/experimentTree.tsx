import {ContentNode} from "../types";
import {createSteppedUnit, UnitStep} from "../../unit/step/createSteppedUnit";
import {createLoopedSteps} from "../../unit/step/createLoopedSteps";
import {ReactNode} from "react";
import {NumberChoice20Exercise} from "./NumberChoice20Exercise";
import {randomInt} from "../../util/random/randomInt";

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
    children: [
        {
            id: "f",
            name: "F",
            type: "folder",
            children: [
                /*
                createSteppedUnit("minus10", "Minusaufgaben bis 10", () => getShuffled(createLoopedSteps(10, limit =>
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
                ))),
                 */
                
                /*
                createSteppedUnit("minus10a", "Minus 10..20", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10);
                    const x = 11 + r1;
                    const y = randomInt(r1);
                    const z = x - y;
                    return createNumbers20Exercise(<div>{x} - {y} =</div>, z);
                })),
                 */
                /*
                createSteppedUnit("minus10b", "Minus 10..20 + Umkehr", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10) + 1;
                    const x = 10 + r1;
                    const y = randomInt(r1) + 1;
                    const z = x - y;
                    return [
                        createNumbers20Exercise(
                            <>
                                <div><b>{x} - {y} =</b></div>
                                <div>&nbsp;</div>
                            </>,
                            z
                        ),
                        createNumbers20Exercise(
                            <>
                                <div>{x} - {y} = {z}</div>
                                <div><b>{x} - {z} =</b></div>
                            </>,
                            y
                        ),
                    ];
                })),
                
                createSteppedUnit("minus10c", "Minus 10..20 umgedreht", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10) + 1;
                    const x = 10 + r1;
                    const y = randomInt(r1) + 1;
                    const z = x - y;
                    return [
                        createNumbers20Exercise(
                            <>
                                <div><b>{x} - ___ = {z}</b></div>
                                <div>&nbsp;</div>
                            </>,
                            y
                        ),
                        createNumbers20Exercise(
                            <>
                                <div>{x} - {y} = {z}</div>
                                <div><b>{x} - {z} =</b></div>
                            </>,
                            y
                        ),
                    ];
                })),
                 */
                
                createSteppedUnit("minus10d", "Minus 10..20 mit Zehnerübergang", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10) + 1;
                    const x = 10 + r1;
                    const y = r1 + 1 + randomInt(9);
                    const z = x - y;
                    return [
                        createNumbers20Exercise(
                            <>
                                <div><b>{x} - {y} =</b></div>
                                <div>&nbsp;</div>
                            </>,
                            z
                        ),
                        createNumbers20Exercise(
                            <>
                                <div>{x} - {y} = {z}</div>
                                <div><b>{x} - {z} =</b></div>
                            </>,
                            y
                        ),
                    ];
                })),
                
                createSteppedUnit("minus10e", "Minus 20..30 mit Zehnerübergang", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10) + 1;
                    const x = 20 + r1;
                    const y = r1 + 1 + randomInt(9);
                    const z = x - y;
                    return [
                        createNumbers20Exercise(
                            <>
                                <div><b>{x} - {y} =</b></div>
                                <div>&nbsp;</div>
                            </>,
                            z
                        ),
                        createNumbers20Exercise(
                            <>
                                <div>{x} - {y} = {z}</div>
                                <div><b>{x} - {z} =</b></div>
                            </>,
                            y
                        ),
                    ];
                })),
                
                createSteppedUnit("minus10f", "Minus mit Doppel-Zehnerübergang", () => createLoopedSteps(1000, () => {
                    const r1 = randomInt(10) + 1;
                    const x = 20 + r1;
                    const y = r1 + 1 + randomInt(19);
                    const z = x - y;
                    return [
                        createNumbers20Exercise(
                            <>
                                <div><b>{x} - {y} =</b></div>
                                <div>&nbsp;</div>
                            </>,
                            z
                        ),
                    ];
                })),
            ],
        },
    ],
};
