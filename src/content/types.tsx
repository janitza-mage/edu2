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
}

export interface Unit extends ContentNodeBase {
    instantiate(): UnitInstantiationResult;
}

export type ContentNode = Folder | Unit;

// --------------------------------------------------------------------------------------------------------------------
// unit instances
// --------------------------------------------------------------------------------------------------------------------

export interface UnitInstantiationResult {
    instance: UnitInstance;
    numberOfSteps: number;
}

export interface UnitInstanceProps {
    
}

export type UnitInstance = (props: UnitInstanceProps) => ReactElement;
