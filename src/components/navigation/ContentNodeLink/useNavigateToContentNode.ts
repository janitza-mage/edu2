import {useNavigate} from "react-router-dom";
import {buildUrlPathForContentPath} from "../../../content/paths";

export type NavigateToContentNode = (path: string[]) => void;

export function useNavigateToContentNode(): NavigateToContentNode {
    const navigate = useNavigate();
    return path => navigate(buildUrlPathForContentPath(path));
}
