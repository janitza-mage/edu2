import {createSteppedUnit, StepInstanceProps} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {mathDiv, mathSpan} from "../../../components/Math/Math";
import {createChoiceStep} from "../../../unit/choice/createChoiceStep";
import {withTextSize} from "../../../unit/step/withTextSize";
import {CenteredContent} from "../../../components/layout/CenteredContent";
import {TextSize} from "../../../components/layout/TextSize";
import {SortEquationTransformationExercise} from "./SortEquationTransformationExercise";
import {EquationTransformationArrowExercise} from "./EquationTransformationArrowExercise";

export const induktionUnit7 = createSteppedUnit("summeUngeradeBeweis", "Beweis", () => [
    createReadStep({
        content: <>
            <p>Es soll gezeigt werden:</p>
            <p>{mathDiv("#sum_{i=1}^n(2i-1) = n^2")}</p>
            <p>Der Induktionsanfang ist, diese Aussage für {mathSpan("n=1")} zu zeigen.</p>
        </>,
    }),
    withTextSize(0.8, createChoiceStep({
        title: <>
            <p>{mathDiv("#sum_{i=1}^n(2i-1) = n^2")}</p>
            <p>Wie lautet die Aussage für {mathSpan("n=1")}?</p>
        </>,
        shuffle: true,
        items: [
            {correct: false, label: mathSpan("#sum_{i=1}^1i = 1^2")},
            {correct: true, label: mathSpan("#sum_{i=1}^1(2i-1) = 1^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}i = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2 #Rightarrow #sum_{i=1}^{n+1}i = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^n(2i-1) = n^2 #Rightarrow #sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{100}i = 100^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{100}(2i-1) = 100^2")},
        ],
    })),
    createReadStep({
        content: <>
            <p>{mathDiv("#sum_{i=1}^n(2i-1) = n^2")}</p>
            <p>Der Induktionsschritt ist: Aus der Aussage für {mathSpan("n")} folgt die Aussage für {mathSpan("n+1")}</p>
        </>,
    }),
    withTextSize(0.8, createChoiceStep({
        title: <>
            <p>{mathDiv("#sum_{i=1}^n(2i-1) = n^2")}</p>
            <p>Was ist für den Induktionsschritt zu zeigen?</p>
        </>,
        shuffle: true,
        items: [
            {correct: false, label: mathSpan("#sum_{i=1}^1i = 1^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^1(2i-1) = 1^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}i = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^ni = n^2 #Rightarrow #sum_{i=1}^{n+1}i = n^2")},
            {correct: true, label: mathSpan("#sum_{i=1}^n(2i-1) = n^2 #Rightarrow #sum_{i=1}^{n+1}(2i-1) = n^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{100}i = 100^2")},
            {correct: false, label: mathSpan("#sum_{i=1}^{100}(2i-1) = 100^2")},
        ],
    })),
    (props: StepInstanceProps) => {
        return <CenteredContent widthPercent={75}>
            <TextSize size={0.9}>
                <SortEquationTransformationExercise
                    {...props}
                    description={"Bringe die Gleichungen für den Induktionsschritt in die richtige Reihenfolge:"}
                    equations={[
                        "#sum_{i=1}^{n+1}(2i-1)",
                        "= (#sum_{i=1}^n(2i-1))+(2(n+1)-1)",
                        "= n^2+(2n+2-1)",
                        "= n^2+2n+1",
                        "= (n+1)^2",
                    ]}
                />
            </TextSize>
        </CenteredContent>;
    },
    (props: StepInstanceProps) => {
        return <CenteredContent widthPercent={75}>
            <TextSize size={0.8}>
                <p>
                    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage
                    für {mathSpan("n")} verwendet? Klicke auf den passenden Pfeil.
                </p>
                <EquationTransformationArrowExercise
                    {...props}
                    correctArrowIndex={1}
                    equations={[
                        "#sum_{i=1}^{n+1}(2i-1)",
                        "= (#sum_{i=1}^n(2i-1))+(2(n+1)-1)",
                        "= n^2+(2n+2-1)",
                        "= n^2+2n+1",
                        "= (n+1)^2",
                    ]}
                />
            </TextSize>
        </CenteredContent>;
    },
]);
