import {Problem} from "./Problem";
import {randomInt} from "../util/random/randomInt";
import {createNumberKeyboardProblem} from "../components/NumberKeyboard/createNumberKeyboardProblem";
import {mathDiv} from "../components/Math/Math";

export function createProblem(): Problem {
    const x = 2 + randomInt(8);
    const y = 2 + randomInt(8);
    return createNumberKeyboardProblem({
        body: input => mathDiv(x + " #cdot " + y + " = " + (input || "?")),
        validator: x * y,
    });
}
