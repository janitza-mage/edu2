import {ContentNode} from "./types";
import {createSteppedUnit} from "../unit/createSteppedUnit";
import {createReadStep} from "../unit/createReadStep";
import {mathSpan, MathSpan} from "../components/Math/Math";
import {createOrderedChooseSingleStep} from "../unit/createOrderedChooseSingleStep";

export const contentTree: ContentNode = {
    id: "root",
    name: "Inhalte",
    type: "folder",
    isolatedChildren: false,
    children: [
        {
            id: "analysis",
            name: "Analysis",
            type: "folder",
            children: [
                createSteppedUnit("one", "One", () => [
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
                    createOrderedChooseSingleStep({
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
                    createOrderedChooseSingleStep({
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
                    }),
                ]),
                {
                    id: "two",
                    name: "Two",
                    type: "unit",
                    instantiate: () => {
                        return (_props) => <div>two</div>;
                    },
                },
                {
                    id: "three",
                    name: "Three",
                    type: "unit",
                    instantiate: () => {
                        return (_props) => <div>three</div>;
                    },
                },
            ],
        },
        {
            id: "lineare_algebra",
            name: "Lineare Algebra",
            type: "folder",
            children: [
                
            ],
        },
        {
            id: "test1",
            name: "Test 1",
            type: "folder",
            children: [
                {
                    id: "test2",
                    name: "Test 2",
                    type: "folder",
                    children: [
                        {
                            id: "test3",
                            name: "Test 3",
                            type: "folder",
                            children: [

                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
