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
        id: "GKG3",
        name: "<, =, >",
        body: () => makeGroesserKleinerGleich(3),
    }
];

export const generatorMap: Map<string, Generator> = (() => {
    const map = new Map<string, Generator>();
    for (const generator of generators) {
        map.set(generator.id, generator);
    }
    return map;
})();
