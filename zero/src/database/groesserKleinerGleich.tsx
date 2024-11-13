import {Exercise} from "./database";
import {makeRandomNumberWithTrueNumberOfDigits} from "./util/random";
import {makeWhichIsCorrect} from "./ui/makeWhichIsCorrect";


export function makeGroesserKleinerGleich(stellenzahl: number): Exercise {
    const a = makeRandomNumberWithTrueNumberOfDigits(stellenzahl);
    const b = makeRandomNumberWithTrueNumberOfDigits(stellenzahl);
    return makeWhichIsCorrect({
        elements: [
            {label: a + " < " + b, correct: a < b},
            {label: a + " = " + b, correct: a === b},
            {label: a + " > " + b, correct: a > b},
        ],
        fontSize: 50,
        spacing: 50,
    });
}