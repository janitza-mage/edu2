type UnitScoreNode = number;
interface FolderScoreNode {
    [id: string]: ScoreNode;
}
type ScoreNode = UnitScoreNode | FolderScoreNode;

function getScoreTree(): ScoreNode {
    return JSON.parse(localStorage.getItem("scoreTree") ?? "null") ?? {};
}

function setScoreTree(root: ScoreNode) {
    localStorage.setItem("scoreTree", JSON.stringify(root));
}

function getScoreNodeChildById(node: ScoreNode, id: string): ScoreNode | null {
    if (node && (typeof node === "object")) {
        return node[id] ?? null;
    } else {
        return null;
    }
}

function getScoreSubNodeBySubPath(currentNode: ScoreNode, path: string[]): ScoreNode | null {
    for (const segment of path) {
        const child = getScoreNodeChildById(currentNode, segment);
        if (!child) {
            return null;
        }
        currentNode = child;
    }
    return currentNode;
}

function getScoreNodeByPath(path: string[]): ScoreNode | null {
    return getScoreSubNodeBySubPath(getScoreTree(), path);
}

function getInitializedSubtree(subPath: string[], score: number) : ScoreNode {
    let result: ScoreNode = score;
    for (let i = subPath.length - 1; i >= 0; i--) {
        result = {[subPath[i]]: result};
    }
    return result;
}

function withScoreUpdated(currentNode: ScoreNode | null | undefined, subPath: string[], score: number): ScoreNode {
    if (subPath.length === 0) {
        return (typeof currentNode === "number") ? Math.max(currentNode, score) : score;
    } else if (!currentNode || (typeof currentNode !== "object")) {
        return getInitializedSubtree(subPath, score);
    } else {
        const [id, ...remainingPath] = subPath;
        const previousChild = currentNode[id];
        const updatedChild = withScoreUpdated(previousChild, remainingPath, score);
        return {
            ...currentNode,
            [id]: updatedChild,
        };
    }
}

export const __testables = {
    getScoreTree,
    setScoreTree,
    getScoreNodeChildById,
    getScoreSubNodeBySubPath,
    getScoreNodeByPath,
    getInitializedSubtree,
    withScoreUpdated,
};

// --------------------------------------------------------------------------------------------------------------------
// public API
// --------------------------------------------------------------------------------------------------------------------

export interface FolderScoreView {
    getChildScore(id: string): number | null;
}

export function getFolderScoreView(path: string[]): FolderScoreView {
    const selectedNode = getScoreNodeByPath(path);
    if (selectedNode && (typeof selectedNode === "object")) {
        const selectedFolder = selectedNode;
        return {
            getChildScore(id: string): number | null {
                const child = selectedFolder[id];
                return (typeof child === "number") ? child : null;
            },
        };
    } else {
        return {
            getChildScore(_id: string): number | null {
                return null;
            },
        };
    }
}

export function getUnitScore(path: string[]): number | null {
    const selectedNode = getScoreNodeByPath(path);
    return (typeof selectedNode === "number") ? selectedNode : null;
}

export function setUnitScore(path: string[], score: number) {
    if (score < 0) {
        score = 0;
    }
    if (score > 10) {
        score = 10;
    }
    score = Math.floor(score);
    setScoreTree(withScoreUpdated(getScoreTree(), path, score));
}
