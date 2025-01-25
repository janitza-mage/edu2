
// score is in the range 0..10

export function calculateFloatScore(progressCounter: number, mistakeCounter: number) {
    const fraction = progressCounter / (progressCounter + mistakeCounter);
    return fraction * 10;
}

export function calculateIntScore(progressCounter: number, mistakeCounter: number) {
    return Math.floor(calculateFloatScore(progressCounter, mistakeCounter));
}
