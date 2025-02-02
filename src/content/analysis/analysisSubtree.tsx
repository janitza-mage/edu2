import {ContentNode} from "../types";
import {folgenSubtree} from "./folgen/folgenSubtree";
import {induktionSubtree} from "./induktion/induktionSubtree";

export const anaysisSubtree: ContentNode = {
    id: "analysis",
    name: "Analysis",
    type: "folder",
    children: [
        induktionSubtree,
        // folgenSubtree,
    ],
};
