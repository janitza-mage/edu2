export function randomInt(n: number): number {
    return Math.floor(Math.random() * n);
}

export function makeRandomNumberWithTrueNumberOfDigits(numberOfDigits: number): number {
    const lowerLimit = Math.pow(10, numberOfDigits - 1);
    return (randomInt(9) + 1) * lowerLimit + randomInt(lowerLimit);
}
