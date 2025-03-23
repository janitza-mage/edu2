import {ReactElement} from "react";

export type ContentNodeType = "folder" | "problem";

export interface ContentNodeBase {
    id: string;
    name: string;
    type: ContentNodeType;
}

export interface Folder extends ContentNodeBase {
    children: ContentNode[];
}

export interface Problem extends ContentNodeBase {
    instantiate(): ReactElement;
}

export type ContentNode = Folder | Problem;
