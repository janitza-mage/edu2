import {Folder} from "../../../content/types";
import {FolderPageBreadcrumbs} from "./FolderPageBreadcrumbs";

export interface FolderPageProps {
    folder: Folder;
    path: string[];
}

export function FolderPage(props: FolderPageProps) {
    return <div>
        <FolderPageBreadcrumbs path={props.path} />
    </div>;
}
