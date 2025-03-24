import {ContentNode} from "../../types";
import {summenSubtree} from "./summenSubtree";
import {ungleichungenSubtree} from "./ungleichungenSubtree";

export const induktionSubtree: ContentNode = {
    id: "induktion",
    name: "Vollständige Induktion",
    type: "folder",
    children: [
        summenSubtree,
        ungleichungenSubtree,
    ],
};
