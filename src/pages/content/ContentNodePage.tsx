import {ContentNode, Folder, Problem} from "../../content/types";
import {FolderPage} from "./folder/FolderPage";
import {ProblemPage} from "./problem/ProblemPage";

export interface ContentNodePageProps {
    node: ContentNode;
    path: string[];
}

export function ContentNodePage(props: ContentNodePageProps) {
    switch (props.node.type) {
        case "folder":
            return <FolderPage folder={props.node as Folder} path={props.path} />;
        case "problem":
            return <ProblemPage unit={props.node as Problem} path={props.path} />;
    }
}
