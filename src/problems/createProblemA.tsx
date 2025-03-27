import {randomInt} from "../util/random/randomInt";
import {createImmediateFeedbackChoiceProblemShuffled} from "../components/Choice/createImmediateFeedbackChoiceProblem";
import {TextSize} from "../components/layout/TextSize";
import {mathSpan} from "../components/Math/Math";
import {ProblemProps} from "./Problem";
import {createNumberKeyboardProblem} from "../components/NumberKeyboard/createNumberKeyboardProblem";
import {MoneyUnit} from "./money/MoneyUnit";
import {ReactNode} from "react";

function createNumberProblem(formula: string, result: number, keyboard: boolean) {
    if (keyboard) {
        return createNumberKeyboardProblem({
            body: input => <TextSize size={4}>{mathSpan(formula + " = " + input)}</TextSize>,
            validator: result,
        });
    } else {
        return createImmediateFeedbackChoiceProblemShuffled(
            <TextSize size={4}>{mathSpan(formula + " = ")}</TextSize>,
            result,
            [result + 5, result - 5, result + 7, result - 7],
            { variant: "inline" },
        );
    }
}

function createMoneyProblem(_keyboard: boolean) {
    const value = randomInt(10000);
    
    const units: ReactNode[] = [];
    let remainingValue = value;
    for (const unitValueCents of [5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]) {
        while (remainingValue >= unitValueCents) {
            units.push(<MoneyUnit valueCents={unitValueCents} />);
            remainingValue -= unitValueCents;
        }
    }
    
    // TODO non-keyboard variant
    return createNumberKeyboardProblem({
        body: input => <div>
            <div>Wie viel ist das Geld zusammen Wert?</div>
            <br />
            <div>{units}</div>
            <br />
            <div>Antwort: {input}</div>
        </div>,
        validator: value,
    })
}

export function createProblemA() {
    switch (randomInt(10)) {
        
        // einmaleins
        case 0: {
            break;
            const x = 2 + randomInt(8);
            const y = 2 + randomInt(8);
            return createNumberProblem(x + " #cdot " + y, x * y, false);
        }
        
        // verdoppeln
        case 1: {
            break;
            const x = 10 + randomInt(40);
            return createNumberProblem("2 #cdot " + x, 2 * x, false);
        }
        
        // halbieren
        case 2: {
            break;
            const x = 10 + randomInt(40);
            return createNumberProblem((2 * x) + " #div 2", x, false);
        }
        
        // Addition (ab + c) auch mit Zehnerübergang
        case 3: {
            break;
            const x = randomInt(100);
            const y = randomInt(10) + 1;
            return createNumberProblem(x + " + " + y, x + y, true);
        }
        
        // Subtraktion (ab - c) auch mit Zehnerübergang
        case 4: {
            break;
            const x = randomInt(100);
            const y = randomInt(10) + 1;
            return createNumberProblem(x + " - " + y, x - y, true);
        }

        // Addition (ab + cd) ohne Zehnerübergang
        case 5: {
            break;
            const a = randomInt(10);
            const b = randomInt(10);
            const c = randomInt(10 - a);
            const d = randomInt(10 - b);
            const x = a * 10 + b;
            const y = c * 10 + d;
            return createNumberProblem(x + " + " + y, x + y, true);
        }

        // Subtraktion (ab - cd) ohne Zehnerübergang
        case 6: {
            const a = randomInt(10);
            const b = randomInt(10);
            const c = randomInt(a + 1);
            const d = randomInt(b + 1);
            const x = a * 10 + b;
            const y = c * 10 + d;
            return createNumberProblem(x + " - " + y, x - y, true);
        }
        
        // Geld zählen TODO Komma kann nicht eingegeben werden!
        case 9999: {
            return createMoneyProblem(true);
        }

    }

    return (props: ProblemProps) => {
        props.onFinish();
        return <></>;
    };
}
