import {Problem} from "../../../content/types";
import {useState} from "react";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";
import {PageWithHeader} from "../../../components/layout/PageWithHeader";
import {IconButton} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export interface ProblemPageProps {
    problem: Problem;
    path: string[];
}

export function ProblemPage(props: ProblemPageProps) {
    const navigateToContentNode = useNavigateToContentNode();
    const [unitInstance, ] = useState(() => props.problem.instantiate());

    function onClickCancel() {
        const parentPath = [...props.path];
        parentPath.pop();
        navigateToContentNode(parentPath);
    }

    return <>
        <PageWithHeader
            header={
                <h1 style={{margin: 0}}>
                    <IconButton onClick={onClickCancel} sx={{marginRight: "1em"}}>
                        <CancelIcon fontSize={"large"} />
                    </IconButton>
                    {props.problem.name}
                </h1>
            }
        >
            {unitInstance}
        </PageWithHeader>
    </>;
}
