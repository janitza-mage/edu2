import {ContentNode} from "../../types";
import {createReadStep} from "../../../unit/read/createReadStep";
import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createChoiceStep} from "../../../unit/choice/createChoiceStep";
import {mathSpan} from "../../../components/Math/Math";

export const folgenSubtree: ContentNode = {
    id: "folgen",
    name: "Folgen",
    type: "folder",
    children: [
        createSteppedUnit("folgen", "Folgen", () => [
            createReadStep({
                content: <div>
                    <p>Eine <b>Folge</b> ist eine unendliche Aufzählung von Dingen.</p>
                    <p>Ein Beispiel sind die ungeraden natürlichen Zahlen:</p>
                    <p>1, 3, 5, 7, ...</p>
                </div>,
            }),
            createReadStep({
                content: <div>
                    <p>Eine Folge hat einen Anfang, aber kein Ende.</p>
                    <p>Die ungeraden Zahlen bis 10 sind keine Folge, weil sie ein Ende haben:</p>
                    <p>1, 3, 5, 7, 9</p>
                    <p>Die ungeraden ganzen Zahlen sind keine Folge, weil sie keinen Anfang haben:</p>
                    <p>..., -3, -1, 1, 3, ...</p>
                </div>,
            }),
            createChoiceStep({
                title: "Wähle die Folge:",
                items: [
                    {
                        label: "1, 2, 3, 4, 5",
                        correct: false,
                    },
                    {
                        label: "1, 2, 3, ...",
                        correct: true,
                    },
                    {
                        label: "..., -2, -1, 0, 1, 2, ...",
                        correct: false,
                    },
                ],
                shuffle: false,
            }),
            createReadStep({
                content: <div>
                    <p>Die Dinge in einer Folge werden <i>Folgenglieder</i> oder <i>Komponenten</i> genannt.</p>
                    <p>Ein Folgenglied kann mehrfach vorkommen:</p>
                    <p>1, 3, 1, 3, 1, 3, ...</p>
                    <p>Die Folgenglieder müssen keine Zahlen sein:</p>
                    <p>rot, grün, rot, grün, rot, grün, ...</p>
                </div>,
            }),
            createChoiceStep({
                title: "Wähle die Folge:",
                items: [
                    {
                        label: "rot, grün, blau, gelb, schwarz, weiß",
                        correct: false,
                    },
                    {
                        label: "rot, grün, rot, grün, rot, grün",
                        correct: false,
                    },
                    {
                        label: "rot, grün, rot, grün, ...",
                        correct: true,
                    },
                ],
                shuffle: false,
            }),
        ]),
        createSteppedUnit("indizes", "Indizes", () => [
            createReadStep({
                content: <div>
                    <p>Die Folgenglieder werden durchnummeriert. Die Nummer eines Folgenglieds heißt <i>Index</i>.</p>
                    <p>Für die Folge der ungeraden natürlichen Zahlen ist:</p>
                    <div style={{textAlign: "center"}}>
                        <div>{mathSpan("a_1 = 1")}</div>
                        <div>{mathSpan("a_2 = 3")}</div>
                        <div>{mathSpan("a_3 = 5")}</div>
                        <div>{mathSpan("a_4 = 7")}</div>
                        <div>{mathSpan("...")}</div>
                    </div>
                </div>,
            }),
            createReadStep({
                content: <div>
                    <p>Das {mathSpan("i")}-te Folgenglied hat den Index {mathSpan("i")} und
                        wird als {mathSpan("a_i")} bezeichnet.</p>
                    <p>Die Indizes sind die positiven natürlichen Zahlen {mathSpan("#mathbb{N}^+")}.</p>
                    <p>Die Folge als Ganzes wird daher als {mathSpan("(a_i)_{i#in#mathbb{N}^+}")} bezeichnet.</p>
                </div>,
            }),
            createChoiceStep({
                title: <>
                    <p>Welchen Wert hat das Folgenglied mit Index {mathSpan("i=5")} in der Folge der ungeraden Zahlen,</p>
                    <div>
                        <div>{mathSpan("a_1 = 1")}</div>
                        <div>{mathSpan("a_2 = 3")}</div>
                        <div>{mathSpan("a_3 = 5")}</div>
                        <div>{mathSpan("...")}</div>
                    </div>
                </>,
                variant: "inline",
                items: [
                    {
                        label: "5",
                        correct: false,
                    },
                    {
                        label: "6",
                        correct: false,
                    },
                    {
                        label: "7",
                        correct: false,
                    },
                    {
                        label: "8",
                        correct: false,
                    },
                    {
                        label: "9",
                        correct: true,
                    },
                    {
                        label: "10",
                        correct: false,
                    },
                ],
                shuffle: false,
            }),
        ]),
    ],
};
