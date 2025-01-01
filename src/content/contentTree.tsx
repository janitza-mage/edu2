import {ContentNode} from "./types";

export const contentTree: ContentNode = {
    id: "root",
    name: "Inhalte",
    type: "folder",
    children: [
        {
            id: "analysis",
            name: "Analysis",
            type: "folder",
            children: [
                {
                    id: "one",
                    name: "One",
                    type: "unit",
                    instantiate: () => {
                        return {
                            numberOfSteps: 3,
                            instance: (_props) => <div>one</div>,
                        };
                    },
                },
                {
                    id: "two",
                    name: "Two",
                    type: "unit",
                    instantiate: () => {
                        return {
                            numberOfSteps: 3,
                            instance: (_props) => <div>two</div>,
                        };
                    },
                },
                {
                    id: "three",
                    name: "Three",
                    type: "unit",
                    instantiate: () => {
                        return {
                            numberOfSteps: 3,
                            instance: (_props) => <div>three</div>,
                        };
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
