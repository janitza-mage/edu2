import {ContentNode, Folder, Unit} from "../../content/types";
import {FolderPage} from "./folder/FolderPage";
import {UnitPage} from "./unit/UnitPage";

export interface ContentNodePageProps {
    node: ContentNode;
    path: string[];
}

export function ContentNodePage(props: ContentNodePageProps) {
    switch (props.node.type) {
        case "folder":
            return <FolderPage folder={props.node as Folder} path={props.path} />;
        case "unit":
            return <UnitPage unit={props.node as Unit} path={props.path} />;
    }
}
