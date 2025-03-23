import {Folder} from "../../../content/types";
import {FolderPageBreadcrumbs} from "./FolderPageBreadcrumbs";
import {NavigationList} from "../../../components/navigation/NavigationList/NavigationList";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";
import {WithHeader} from "../../../components/layout/WithHeader";
import FolderIcon from '@mui/icons-material/Folder';
import FileIcon from '@mui/icons-material/InsertDriveFile';

export interface FolderPageProps {
    folder: Folder;
    path: string[];
}

export function FolderPage(props: FolderPageProps) {
    const navigateToContentNode = useNavigateToContentNode();
    const navigationElements = props.folder.children.map(child => ({
        icon: child.type === "folder" ? <FolderIcon /> : <FileIcon />,
        label: child.name,
        onClick: () => navigateToContentNode([...props.path, child.id]),
    }));
    return <WithHeader
        header={<div style={{backgroundColor: "#ccc", borderBottom: "1px solid #aaa"}}>
            <FolderPageBreadcrumbs path={props.path} />
            <h1 style={{margin: 0}}>{props.folder.name}</h1>
        </div>}
        overflow={"hidden scroll"}
    >
        <NavigationList elements={navigationElements} />
    </WithHeader>;
}
