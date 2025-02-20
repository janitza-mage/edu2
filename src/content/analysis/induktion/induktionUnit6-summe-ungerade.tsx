import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {createFormulaKeyboardExercise} from "../../../components/FormulaEditor/createFormulaKeyboardExercise";
import {Atom, CursorPosition, FormulaNode, SequenceNode, SumNode} from "../../../components/FormulaEditor/FormulaNode";

const indexValueReminder = <p>Zur Erinnerung aus dem Grundkurs: Die
    Indizes {mathSpan("i")} und {mathSpan("n")} sind <i>nicht</i> die
    ungeraden Zahlen selbst, sondern nummerieren diese durch. Die {mathSpan("i")}-te ungerade Zahl
    hat den Wert {mathSpan("(2i-1)")}.</p>;
    
export const induktionUnit6 = createSteppedUnit("summeUngerade", "Summe der ersten n ungeraden Zahlen", () => [
    /*
    createReadStep({
        content: <>
            <p>Es soll gezeigt werden: Die Summe der ersten {mathSpan("n")} ungeraden Zahlen ist {mathSpan("n^2")}.</p>
            {indexValueReminder}
            <p>
                <MathTable widthPercent={60} headers={["n", "1+3+...+(2n-1)", "n^2"]} cells={[
                    ["1", "1", "1"],
                    ["2", "1+3=4", "4"],
                    ["3", "1+3+5=9", "9"],
                    ["4", "1+3+5+7=16", "16"],
                    ["5", "1+3+5+7+9=25", "25"],
                ]} />
            </p>
        </>,
    }),
    createNumberKeyboardExercise({
        body: input => <>
            {indexValueReminder}
            <p>Was ist der Wert der 100. ungeraden Zahl?</p>
            <p>{mathDiv("#textcolor{blue}{" + (input || "?") + "}")}</p>
        </>,
        correct: 199,
    }),
    createNumberKeyboardExercise({
        body: input => <>
            <p>Die Summe der ersten {mathSpan("n")} ungeraden Zahlen ist {mathSpan("n^2")}.</p>
            <p>Was ist die Summe der ersten 100 ungeraden Zahlen?</p>
            <p>{mathDiv("#sum_{i=1}^{100}(2i+1) = #textcolor{blue}{" + (input || "?") + "}")}</p>
        </>,
        correct: 10000,
    }),
    withTextSize(0.7, createChoiceStep({
        title: <>
            <p>Es soll gezeigt werden: {mathSpan("#sum_{i=1}^{n}(2i-1) = n^2")}. Wie lautet diese Aussage
                für {mathSpan("n=100")}?</p>
        </>,
        shuffle: true,
        items: [
            {correct: false, label: mathSpan("#sum_{i=1}^1i = 1^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^1(2i-1) = 1^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^n(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}i = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2 #Rightarrow #sum_{i=1}^{n+1}i = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^n(2i-1) = n^2 #Rightarrow #sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{100}i = 100^2")},
            {correct: true, label: mathSpan("#sum_{i=1}^{100}(2i-1) = 100^2")},
        ],
    })),
     */
    createFormulaKeyboardExercise({
        body: (input, cursorPosition) => <>
            <p>Es soll gezeigt werden: {mathSpan("#sum_{i=1}^{n}(2i-1) = n^2")}. Wie lautet diese Aussage
                für {mathSpan("n=100")}?</p>
            <p>{mathDiv(withCursor(input, cursorPosition).convertToLatex())}</p>
        </>,
        formulaKeys: [
            ["S", new SumNode([
                new SequenceNode([new Atom("a")]),
                new SequenceNode([new Atom("b")]),
                new SequenceNode([new Atom("c")]),
            ]),
            [2, new Atom("2b")],
            [3, new Atom("3c")],
        ],
        validator: input => true,
    })
]);

const cursorAtom = new Atom("§cursor");
function withCursor(formula: FormulaNode, cursorPosition: CursorPosition): FormulaNode {
    return formula.insertLeft(cursorPosition, cursorAtom).formulaNode;
}
