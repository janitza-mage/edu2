
// score is in the range 0..10
export function calculateScore(progressCounter: number, mistakeCounter: number) {
    const fraction = progressCounter / (progressCounter + mistakeCounter);
    return Math.floor(fraction * 10);
}
