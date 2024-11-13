export function randomInt(minIncl: number, maxExcl: number): number {
    return Math.floor(Math.random() * (maxExcl - minIncl) + minIncl);
}
