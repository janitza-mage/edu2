import {Problem} from "./Problem";
import {randomInt} from "../util/random/randomInt";
import {createNumberKeyboardProblem} from "../components/NumberKeyboard/createNumberKeyboardProblem";
import {mathDiv} from "../components/Math/Math";
import {TextSize} from "../components/layout/TextSize";
import {createImmediateFeedbackChoiceProblemShuffled} from "../components/Choice/createImmediateFeedbackChoiceProblem";

export function createProblem3002(): Problem {
    /*
    const x = 2 + randomInt(8);
    const y = 2 + randomInt(8);
    return createNumberKeyboardProblem({
        body: input => <TextSize size={4}>{mathDiv(x + " #cdot " + y + " = " + (input || "?"))}</TextSize>,
        validator: x * y,
    });
     */

    
    const x = 2 + randomInt(8);
    const y = 2 + randomInt(8);
    return createImmediateFeedbackChoiceProblemShuffled(
        <TextSize size={4}>{mathDiv(x + " #cdot " + y + " = ")}</TextSize>,
        x * y,
        [
            x * y + 5,
            x * y - 5,
            x * y + 7,
            x * y - 7,
        ],
        {
            variant: "inline",
        },
    );
}
