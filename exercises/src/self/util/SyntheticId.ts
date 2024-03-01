
let syntheticIdCounter = 0;

export function allocateSyntheticIds(count: number): number {
    const result = syntheticIdCounter;
    syntheticIdCounter += count;
    return result;
}

export function syntheticIdToText(id: number): string {
    return `synthetic-${id}`;
}
