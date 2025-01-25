import {Folder} from "../../../content/types";
import {FolderPageBreadcrumbs} from "./FolderPageBreadcrumbs";
import {getContentNodeByPath} from "../../../content/paths";
import {NavigationList} from "../../../components/navigation/NavigationList/NavigationList";
import {ReactNode} from "react";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {MiniPie} from "../../../components/MiniPie/MiniPie";

export interface FolderPageProps {
    folder: Folder;
    path: string[];
}

export function FolderPage(props: FolderPageProps) {
    const navigateToContentNode = useNavigateToContentNode();
    const navigationElements = props.folder.children.map(child => {
        let decoration = null;
        switch (child.type) {
            case "folder":
                decoration = <ChevronRightIcon />;
                break;
            case "unit":
                decoration = <MiniPie score={7} size={"2em"} resolution={30} />;
        }
        return {
            label: child.name,
            decoration,
            onClick: () => navigateToContentNode([...props.path, child.id]),
        };
    });
    return <>
        <div style={{backgroundColor: "#ccc", borderBottom: "1px solid #aaa"}}>
            <FolderPageBreadcrumbs path={props.path} />
            <h1 style={{margin: 0}}>{props.folder.name}</h1>
        </div>
        <NavigationList elements={navigationElements} />
    </>;
}
