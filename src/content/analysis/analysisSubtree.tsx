import {ContentNode} from "../types";
import {folgenSubtree} from "./folgen/folgenSubtree";

export const anaysisSubtree: ContentNode = {
    id: "analysis",
    name: "Analysis",
    type: "folder",
    children: [
        folgenSubtree,
    ],
};
