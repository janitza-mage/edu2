import {ContentNode} from "../../../content/types";
import {Breadcrumbs, BreadcrumbsElement} from "../../../components/navigation/Breadcrumbs/Breadcrumbs";
import {buildUrlPathForContentPath, getContentNodeChildById} from "../../../content/paths";
import {contentTree} from "../../../content/contentTree";

export interface FolderPageBreadcrumbsProps {
    path: string[];
}

export function FolderPageBreadcrumbs(props: FolderPageBreadcrumbsProps) {
    const elements = buildElements(props);
    if (!elements) {
        return <div>ERROR</div>;
    }
    return <Breadcrumbs elements={elements} />;
    
}

function buildElements(props: FolderPageBreadcrumbsProps): BreadcrumbsElement[] | null {

    // no breadcrumbs for the root node
    if (props.path.length === 0) {
        return [];
    }
    
    // otherwise, add a breadcrumb that links to the root node even though there is no path segment for it
    const result: BreadcrumbsElement[] = [
        {
            text: "Themen",
            to: buildUrlPathForContentPath([])
        }
    ];
    
    // the breadcrumbs for the current node stop at the parent node
    const path = [...props.path];
    path.pop();

    // build the remaining breadcrumbs
    let currentNode: ContentNode = contentTree;
    const accumulatedPath: string[] = [];
    for (const pathSegment of path) {
        const child = getContentNodeChildById(currentNode, pathSegment);
        if (!child) {
            return null;
        }
        currentNode = child;
        accumulatedPath.push(pathSegment);
        result.push({
            text: currentNode.name,
            to: buildUrlPathForContentPath(accumulatedPath),
        });
    }
    
    return result;
}
