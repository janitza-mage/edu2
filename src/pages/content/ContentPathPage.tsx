import {ContentNodePage} from "./ContentNodePage";
import {getContentNodeByPath} from "../../content/paths";

export interface ContentPathPageProps {
    contentPath: string[];
}

export function ContentPathPage(props: ContentPathPageProps) {
    let node = getContentNodeByPath(props.contentPath);
    if (!node) {
        return <div>node not found: {props.contentPath.join("/")}</div>;
    }
    return <ContentNodePage node={node} path={props.contentPath} />;
}
