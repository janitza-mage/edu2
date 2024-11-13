import {ReactElement} from "react";
import {makeGroesserKleinerGleich} from "./groesserKleinerGleich";

// --------------------------------------------------------------------------------------------------------------------
// exercise definition
// --------------------------------------------------------------------------------------------------------------------

export interface ExerciseProps {
    onFinish(success: boolean): void;
}

export type Exercise = (props: ExerciseProps) => ReactElement;

// --------------------------------------------------------------------------------------------------------------------
// generators
// --------------------------------------------------------------------------------------------------------------------

export interface Generator {
    id: string;
    name: string;
    body: () => Exercise;
}

// --------------------------------------------------------------------------------------------------------------------
// exercise corpus
// --------------------------------------------------------------------------------------------------------------------

export const generators: Generator[] = [
    {
        id: "GKG-10-100",
        name: "<, =, > von 10 bis 100",
        body: () => makeGroesserKleinerGleich(10, 100),
    },
    {
        id: "GKG-50-200",
        name: "<, =, > von 50 bis 200",
        body: () => makeGroesserKleinerGleich(50, 200),
    },
    {
        id: "GKG-100-1000",
        name: "<, =, > von 100 bis 1000",
        body: () => makeGroesserKleinerGleich(100, 1000),
    },
];

export const generatorMap: Map<string, Generator> = (() => {
    const map = new Map<string, Generator>();
    for (const generator of generators) {
        map.set(generator.id, generator);
    }
    return map;
})();
