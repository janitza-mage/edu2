import {ContentNode} from "./types";
import {anaysisSubtree} from "./analysis/analysisSubtree";

export const contentTree: ContentNode = {
    id: "root",
    name: "Inhalte",
    type: "folder",
    children: [
        anaysisSubtree,
        /*
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
        experimentTree,
        
         */
    ],
};
