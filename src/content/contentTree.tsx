import {ContentNode} from "./types";
import {createSteppedUnit} from "../unit/createSteppedUnit";
import {createReadStep} from "../unit/createReadStep";

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
                        content: <div>foo</div>,
                    }),
                    createReadStep({
                        content: <div>bar</div>
                    }),
                    createReadStep({
                        content: <div>abc</div>
                    }),
                    createReadStep({
                        content: <div>def</div>
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
