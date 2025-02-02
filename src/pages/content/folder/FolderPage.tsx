import {Folder} from "../../../content/types";
import {FolderPageBreadcrumbs} from "./FolderPageBreadcrumbs";
import {NavigationList} from "../../../components/navigation/NavigationList/NavigationList";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {ScoreMiniPie} from "../../../components/atoms/MiniPie/ScoreMiniPie";
import {useFolderScores} from "./useFolderScores";
import {NotYetDoneMiniPie} from "../../../components/atoms/MiniPie/NotYetDoneMiniPie";
import {WithHeader} from "../../../components/layout/WithHeader";

export interface FolderPageProps {
    folder: Folder;
    path: string[];
}

export function FolderPage(props: FolderPageProps) {
    const folderScores = useFolderScores(props.path);
    const navigateToContentNode = useNavigateToContentNode();
    const navigationElements = props.folder.children.map(child => {
        let decoration = null;
        switch (child.type) {
            
            case "folder": {
                decoration = <ChevronRightIcon />;
                break;
            }
            
            case "unit": {
                const score = folderScores.getChildScore(child.id);
                if (score === null) {
                    decoration = <NotYetDoneMiniPie size={"2em"} resolution={30} />;
                } else {
                    decoration = <ScoreMiniPie score={score} size={"2em"} resolution={30} />;
                }
            }
            
        }
        return {
            label: child.name,
            decoration,
            onClick: () => navigateToContentNode([...props.path, child.id]),
        };
    });
    return <WithHeader
        header={<div style={{backgroundColor: "#ccc", borderBottom: "1px solid #aaa"}}>
            <FolderPageBreadcrumbs path={props.path} />
            <h1 style={{margin: 0}}>{props.folder.name}</h1>
        </div>}
        overflow={"hidden scroll"}
    >
        <NavigationList elements={navigationElements} scores={folderScores} />
    </WithHeader>;
}
