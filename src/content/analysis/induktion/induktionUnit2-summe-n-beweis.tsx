import {createSteppedUnit, StepInstanceProps} from "../../../unit/step/createSteppedUnit";
import {ReactNode} from "react";
import {mathSpan} from "../../../components/Math/Math";
import {HorizontalSplit} from "../../../components/layout/HorizontalSplit";
import {createBoxMatrix} from "./createBoxMatrix";
import {getShuffled} from "../../../util/random/getShuffled";
import {ImmediateFeedbackChoiceExercise} from "../../../unit/choice/ImmediateFeedbackChoiceExercise";
import {createReadStep} from "../../../unit/read/createReadStep";
import {inlineLet} from "../../../util/inlineLet";
import {CenteredContent} from "../../../components/layout/CenteredContent";

export const induktionUnit2 = createSteppedUnit("summeNBeweis", "Beweis", () => {
    const makeContent = (matrixSpec: string[], right: ReactNode, bottom: ReactNode) => <>
        <p>Anschaulicher Beweis:</p>
        <p>Die Summe der ersten {mathSpan("n")} Zahlen ist {mathSpan("#frac{n(n+1)}{2}")}.</p>
        <p>Beispiel: Die Summe der ersten 5 Zahlen ist 15</p>
        <HorizontalSplit positionPercentage={30}>
            {createBoxMatrix(matrixSpec)}
            <div>{right}</div>
        </HorizontalSplit>
        <br />
        {bottom}
    </>;
    const matrix1 = [
        "bwwww",
        "bbwww",
        "bbbww",
        "bbbbw",
        "bbbbb",
    ];
    const matrix2 = [
        "0wwww",
        "R0www",
        "RR0ww",
        "RRR0w",
        "RRRR0",
    ];
    const matrix3 = [
        "1wwww",
        "R1www",
        "RR1ww",
        "RRR1w",
        "RRRR1",
    ];
    /*
        TODO: Es ist unklar, ob solche Übungen hier dem Verständnis helfen oder eher den Denkfluß behindern.
        Wahrscheinlich hängt das davon ab, wie gut man es ohne die Übung schon versteht. Dann wäre es gut,
        wenn man die Übungen dazu schalten kann, wenn man Verständnisschwierigkeiten hat, aber das ist
        ein generelles Problem: Was wäre ein gutes UI dafür? Evtl. eines, das einem erklärt wird, wenn
        man ein paar man Fehler gemacht hat?
    */
    const makeFormulaExercise = (correct: string, wrong: string[]) => {
        const items = getShuffled([
            {label: mathSpan(correct), correct: true},
            ...wrong.map(x => ({label: mathSpan(x), correct: false})),
        ]);
        return (props: StepInstanceProps) => <ImmediateFeedbackChoiceExercise
            title={null}
            variant={"inline"}
            items={items}
            onProgress={props.onProgress}
            onMistake={props.onMistake}
            onFinishStep={props.onFinishStep}
        />;
    }
    return [
        createReadStep({
            content: makeContent(matrix1,
                <>Die blauen Kästchen zeigen die Zahlen, die addiert werden.</>,
                <></>
            ),
        }),
        inlineLet(makeFormulaExercise("n^2", ["n", "2n"]), exercise =>
            props => <CenteredContent widthPercent={90}>
                {makeContent(matrix2, <>
                    <div>Das rote Dreieck deckt genau die Häfte des großen Quadrats ab.</div>
                    <div><b>Welche Fläche hat das große Quadrat?</b></div>
                </>, exercise(props))}
            </CenteredContent>
        ),
        inlineLet(makeFormulaExercise("#frac{n^2}{2}", ["#frac{n}{2}", "n", "n^2"]), exercise =>
            props => <CenteredContent widthPercent={90}>
                {makeContent(matrix2, <>
                    <div>Das rote Dreieck deckt genau die Häfte des großen Quadrats ab. Das Quadrat hat
                        eine Fläche von {mathSpan("n^2")}.</div>
                    <div><b>Welche Fläche hat das große Dreieck?</b></div>
                </>, exercise(props))}
            </CenteredContent>,
        ),
        createReadStep({
            content: makeContent(matrix2, <div>
                Das rote Dreieck deckt genau die Häfte des großen Quadrats ab. Das Quadrat hat eine Fläche von
                {mathSpan("n^2")}, das Dreieck also eine Fläche von {mathSpan("#frac{n^2}{2}")}.
            </div>, <></>),
        }),
        inlineLet(makeFormulaExercise("n", ["#frac{n}{2}", "2n", "n^2", "#frac{n^2}{2}"]), exercise =>
            props => <CenteredContent widthPercent={90}>
                {makeContent(matrix3, <>
                    <div>Die restliche Fläche, die von den ersten n Zahlen verdeckt wird, besteht aus den
                        kleinen grünen Dreiecken.
                    </div>
                    <div><b>Wie viele dieser grünen Dreiecke gibt es?</b></div>
                </>, exercise(props))}
            </CenteredContent>,
        ),
        inlineLet(makeFormulaExercise("#frac{1}{2}", ["1", "2", "n", "#frac{n}{2}", "2n", "n^2", "#frac{n^2}{2}"]), exercise =>
            props => <CenteredContent widthPercent={90}>
                {makeContent(matrix3, <>
                    <div>Die restliche Fläche, die von den ersten n Zahlen verdeckt wird, besteht aus den
                        kleinen grünen Dreiecken. Es gibt {mathSpan("n")} von diesen kleinen Dreiecken.
                    </div>
                    <div><b>Welche Fläche hat jedes kleine Dreieck?</b></div>
                </>, exercise(props))}
            </CenteredContent>,
        ),
        createReadStep({
            content: makeContent(matrix3, <>
                Die kleinen grünen Dreiecke decken jeweils {mathSpan("#frac{1}{2}")} ab. Es
                gibt {mathSpan("n")} solcher Dreiecke, also zusammen {mathSpan("#frac{n}{2}")}.
            </>, <></>),
        }),
        createReadStep({
            content: makeContent(matrix3, <>
                <div>Rotes Dreieck: {mathSpan("#frac{n^2}{2}")}</div>
                <div>Grüne Dreiecke: {mathSpan("#frac{n}{2}")}</div>
                <div>Zusammen:</div>
                <div>{mathSpan("#frac{n^2}{2} + #frac{n}{2} = #frac{n^2+n}{2} = #frac{n(n+1)}{2}")}</div>
            </>, <></>),
        }),
    ];
});
