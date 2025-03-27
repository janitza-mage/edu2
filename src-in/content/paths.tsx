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

export function getNextUnitPath(currentUnitPath: string[]): string[] | null {
    return getFollowUnitPath(currentUnitPath);
}

function getFollowUnitPath(path: string[]): string[] | null {
    if (path.length === 0) {
        return null;
    }
    const parentPath = [...path];
    const lastSegment = parentPath.pop();
    const parent = getContentNodeByPath(parentPath);
    if (!parent || parent.type !== "folder") {
        return null;
    }
    const parentFolder = parent as Folder;
    if (parentFolder.isolatedChildren ?? false) {
        return null;
    }
    let index = parentFolder.children.findIndex(child => child.id === lastSegment);
    if (index < 0) {
        return null;
    }
    while (index < parentFolder.children.length) {
        index++;
        const sibling = parentFolder.children[index];
        const siblingPath = [...parentPath, sibling.id];
        const siblingFirstUnit = getFirstUnitPath(siblingPath);
        if (siblingFirstUnit) {
            return siblingFirstUnit;
        }
    }
    return getFollowUnitPath(parentPath);
}

function getFirstUnitPath(path: string[]): string[] | null {
    const node = getContentNodeByPath(path);
    if (!node) {
        return null;
    }
    switch (node.type) {
        
        case "folder": {
            const folder = node as Folder;
            if (folder.isolatedChildren) {
                return null;
            }
            for (const child of folder.children) {
                const childResult = getFirstUnitPath([...path, child.id]);
                if (childResult) {
                    return childResult;
                }
            }
            return null;
        }
            
        case "unit":
            return path;
        
        default:
            return null;
    }
}


