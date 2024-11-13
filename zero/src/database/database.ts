
export type GeneratorBody = () => void;

export interface Generator {
    id: string;
    name: string;
    body: GeneratorBody;
}

export const generators: Generator[] = [
    {
        id: "eins",
        name: "Eins",
        body: () => {
            console.log("Eins");
        },
    },
    {
        id: "zwei",
        name: "Zwei",
        body: () => {
            console.log("Zwei");
        },
    },
];
