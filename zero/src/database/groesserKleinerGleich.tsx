import {Exercise} from "./database";
import {makeWhichIsCorrect} from "./ui/makeWhichIsCorrect";
import {randomInt} from "./util/random";


export function makeGroesserKleinerGleich(minIncl: number, maxExcl: number): Exercise {
    const a = randomInt(minIncl, maxExcl);
    const b = randomInt(minIncl, maxExcl);
    return makeWhichIsCorrect({
        title: "Was ist richtig?",
        elements: [
            {label: a + " < " + b, correct: a < b},
            {label: a + " = " + b, correct: a === b},
            {label: a + " > " + b, correct: a > b},
        ],
        fontSize: 50,
        spacing: 50,
    });
}