import {Unit} from "../../../content/types";
import {FolderPageBreadcrumbs} from "../folder/FolderPageBreadcrumbs";
import {NavigationList} from "../../../components/navigation/NavigationList/NavigationList";
import CancelIcon from '@mui/icons-material/Cancel';
import {IconButton} from "@mui/material";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";

export interface UnitPageProps {
    unit: Unit;
    path: string[];
}

export function UnitPage(props: UnitPageProps) {
    const navigateToContentNode = useNavigateToContentNode();
    
    function onClickCancel() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("wirklich abbrechen?")) {
            const parentPath = [...props.path];
            parentPath.pop();
            navigateToContentNode(parentPath);
        }
    }
    
    return <>
        <div style={{backgroundColor: "#ccc", borderBottom: "1px solid #aaa"}}>
            <h1 style={{margin: 0}}>
                <IconButton onClick={onClickCancel} sx={{marginRight: "1em"}}>
                    <CancelIcon fontSize={"large"} />
                </IconButton>
                {props.unit.name}
            </h1>
        </div>
    </>;
}
