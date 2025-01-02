import {ReactElement} from "react";

// --------------------------------------------------------------------------------------------------------------------
// content nodes
// --------------------------------------------------------------------------------------------------------------------

export type ContentNodeType = "folder" | "unit";

export interface ContentNodeBase {
    id: string;
    name: string;
    type: ContentNodeType;
}

export interface Folder extends ContentNodeBase {
    children: ContentNode[];
    isolatedChildren?: boolean; // typically only false for the root folder, so the default is true
}

export interface Unit extends ContentNodeBase {
    instantiate(): UnitInstance;
}

export type ContentNode = Folder | Unit;

// --------------------------------------------------------------------------------------------------------------------
// unit instances
// --------------------------------------------------------------------------------------------------------------------

export interface UnitInstanceProps {
    onProgress: () => void;
    onMistake: () => void;
    onFinish: () => void;
}

export type UnitInstance = (props: UnitInstanceProps) => ReactElement;
