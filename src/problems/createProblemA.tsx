import {randomInt} from "../util/random/randomInt";
import {createImmediateFeedbackChoiceProblemShuffled} from "../components/Choice/createImmediateFeedbackChoiceProblem";
import {TextSize} from "../components/layout/TextSize";
import {mathDiv} from "../components/Math/Math";
import {ProblemProps} from "./Problem";
import {createNumberKeyboardProblem} from "../components/NumberKeyboard/createNumberKeyboardProblem";
import {MoneyUnit} from "./money/MoneyUnit";
import {ReactNode} from "react";

function createNumberProblem(formula: string, result: number, keyboard: boolean) {
    if (keyboard) {
        return createNumberKeyboardProblem({
            body: input => <TextSize size={4}>{mathDiv(formula + " = " + input)}</TextSize>,
            validator: result,
        });
    } else {
        return createImmediateFeedbackChoiceProblemShuffled(
            <TextSize size={4}>{mathDiv(formula + " = ")}</TextSize>,
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
    switch (randomInt(4)) {
        
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
        
        // Geld zählen TODO Komma kann nicht eingegeben werden!
        case 3: {
            return createMoneyProblem(true);
        }

    }

    return (props: ProblemProps) => {
        props.onFinish();
        return <></>;
    };
}
