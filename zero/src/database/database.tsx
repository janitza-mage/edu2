import {Button} from "@mui/material";
import {ReactElement} from "react";

// --------------------------------------------------------------------------------------------------------------------
// exercise definition
// --------------------------------------------------------------------------------------------------------------------

export interface ExerciseProps {
    onFinish(success: boolean): void;
}

export type Exercise = (props: ExerciseProps) => ReactElement;

// --------------------------------------------------------------------------------------------------------------------
// exercise factory methods
// --------------------------------------------------------------------------------------------------------------------

function makeDummyExercise() {
    return (props: ExerciseProps) => <>
        <Button onClick={() => props.onFinish(true)}>SUCCESS</Button>
        <Button onClick={() => props.onFinish(false)}>FAILURE</Button>
    </>;
}

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
        id: "eins",
        name: "Eins",
        body: () => makeDummyExercise(),
    },
    {
        id: "zwei",
        name: "Zwei",
        body: () => makeDummyExercise(),
    },
];

export const generatorMap: Map<string, Generator> = (() => {
    const map = new Map<string, Generator>();
    for (const generator of generators) {
        map.set(generator.id, generator);
    }
    return map;
})();
