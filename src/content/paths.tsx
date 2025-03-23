import {ContentNode, Folder} from "./types";
import {contentTree} from "./contentTree";

export function getContentNodeChildById(node: ContentNode, id: string): ContentNode | null {
    if (node.type === "folder") {
        let child = (node as Folder).children.find(child => child.id === id);
        if (child) {
            return child;
        }
    }
    return null;
}

export function getContentNodeByPath(path: string[]): ContentNode | null {
    let currentNode = contentTree;
    for (const segment of path) {
        const child = getContentNodeChildById(currentNode, segment);
        if (!child) {
            return null;
        }
        currentNode = child;
    }
    return currentNode;
}

export function buildUrlPathForContentPath(path: string[]): string {
    return "/" + path.join("/");
}
