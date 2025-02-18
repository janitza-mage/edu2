/**
 * 
 */
export interface FormulaNode {

    /**
     * Returns null if this node has no insertable places.
     */
    getFirstCursorPosition(): CursorPosition | null;
    
    /**
     * Returns null if this node has no insertable places.
     */
    getLastCursorPosition(): CursorPosition | null;

    /**
     * Returns null if this node has no insertable places after the current cursor position.
     */
    getNextCursorPosition(currentPosition: CursorPosition): CursorPosition | null;
    
    /**
     * Returns null if this node has no insertable places before the current cursor position.
     */
    getPreviousCursorPosition(currentPosition: CursorPosition): CursorPosition | null;

    insertLeft(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition;

    insertRight(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition;

    /**
     * Returns null if there is nothing to delete. The caller would usually keep its current formula and cursor
     * position, and possibly notify the user.
     */
    deleteLeft(currentPosition: CursorPosition): FormulaNodeAndCursorPosition | null;

    /**
     * Returns null if there is nothing to delete. The caller would usually keep its current formula and cursor
     * position, and possibly notify the user.
     */
    deleteRight(currentPosition: CursorPosition): FormulaNodeAndCursorPosition | null;

    /**
     * Whether this node contains any sub-content that was inserted by the user. The node itself and its "rigid"
     * structure do not count towards this, even if inserted by the user. The intention is that any node without
     * such content can be deleted by the user in a single step, while content _with_ user-inserted sub-content
     * would refuse deletion until the user has deleted that content first, to avoid deleting large amounts of
     * content with a single keypress.
     */
    hasUserInsertedSubContent(): boolean;
    
    // note: may use our own "extended" Latex syntax, such as # instead of \ and using §cursor.
    convertToLatex(): string;
    
}

/**
 * A cursor position within a formula node is a nonempty array of indices. A position always selects a place between
 * two nodes, where something can be inserted.
 * 
 * Conceptually, if a cursor position gets split somewhere in the middle (with at least one index left and right of
 * the split), then the first part selects a sub-node, not a place between two sub-nodes. The second part selects an
 * insertion place within that sub-node. In other words, an index within a cursor position gets a diffrent meaning
 * whether more indices are right of it or not.
 * 
 * For example, consider a sequence node and a position whose first index is 2. If that index is the only index
 * of the position, then it selects the place between the second and third element nodes of that sequence. If, however,
 * there is at least one more index after it, then it selects the third element node of the sequence, and the remaining
 * indices select an insertion place within that element.
 */
export type CursorPosition = [number, ...number[]];

/**
 * Common result for FormulaNode methods.
 */
export interface FormulaNodeAndCursorPosition {
    formulaNode: FormulaNode;
    cursorPosition: CursorPosition;
}

// --------------------------------------------------------------------------------------------------------------------
// specific node types
// --------------------------------------------------------------------------------------------------------------------

export class SequenceNode implements FormulaNode {
    
    private readonly elements: FormulaNode[];
    
    constructor(elements: FormulaNode[]) {
        this.elements = elements;
    }

    getFirstCursorPosition(): CursorPosition | null {
        return [0];
    }

    getLastCursorPosition(): CursorPosition | null {
        return [this.elements.length];
    }
    
    getNextCursorPosition([index, ...remainingIndices]: CursorPosition): CursorPosition | null {
        if (index === this.elements.length) {
            return null;
        }
        const element = this.elements[index];
        const elementResult = (remainingIndices.length === 0)
            ? element.getFirstCursorPosition()
            : element.getNextCursorPosition(remainingIndices as CursorPosition);
        return (elementResult === null) ? [index + 1] : [index, ...elementResult];
    }

    getPreviousCursorPosition([index, ...remainingIndices]: CursorPosition): CursorPosition | null {
        if (index === 0) {
            return null;
        }
        const element = this.elements[index - 1];
        const elementResult = (remainingIndices.length === 0)
            ? element.getLastCursorPosition()
            : element.getPreviousCursorPosition(remainingIndices as CursorPosition);
        return [index - 1, ...(elementResult ?? [])];
    }

    insertLeft(cursorPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        return this.insertInternal(cursorPosition, what, 1);
    }

    insertRight(cursorPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        return this.insertInternal(cursorPosition, what, 0);
    }

    private insertInternal([index, ...remainingIndices]: CursorPosition, what: FormulaNode, cursorIncrement: number): FormulaNodeAndCursorPosition {
        const newElements = [...this.elements];
        let newCursorPosition: CursorPosition;
        if (remainingIndices.length === 0) {
            newElements.splice(index, 0, what);
            newCursorPosition = [index + cursorIncrement];
        } else {
            const subResult = newElements[index].insertLeft(remainingIndices as CursorPosition, what);
            newElements[index] = subResult.formulaNode;
            newCursorPosition = [index, ...subResult.cursorPosition];
        }
        return {
            formulaNode: new SequenceNode(newElements),
            cursorPosition: newCursorPosition,
        };
    }
    
    /*
    TODO: Die Idee, dass man beim Löschen in ein komplexes Element reinrutscht und dann erst den Inhalt löscht, bevor
    man das ganze komplexe Element löscht, war, dass so nicht auf einen Schlag vieles verschwindet. Aber das
    Problem ist immer noch da, nur anders: Man kann jetzt ein ganzes komplexes Element mit allen Inhalten auf
    einen Schlag verschwinden lassen, wenn man sich am Anfang davon befindet, auch wenn rechts vom Cursor noch viele
    Inhalte stehen.
    
    Ist so aber vllt trotzdem besser, wenn man bedenkt, dass es nur "nach links löschen" und "nach links einfügen"
    gibt: Meistens ist der Cursor rechts von den Inhalten, und tritt o.g. Situation i.A. nicht auf.  
    
    Neueste Änderung: Man löscht das komplexe Element jetzt nur noch, wenn es komplett leer ist. Mal schauen, ob das
    besser ist.
     */

    deleteLeft([index, ...remainingIndices]: CursorPosition): FormulaNodeAndCursorPosition | null {
        const newElements = [...this.elements];
        let newCursorPosition: CursorPosition;
        if (remainingIndices.length === 0) {
            // we're not inside an element
            if (index === 0) {
                // we're at the start of this node, so return to the caller that we cannot delete anything inside it
                return null;
            }
            const subPosition = newElements[index - 1].getLastCursorPosition();
            if (subPosition !== null) {
                // move the cursor into the element to the left, to delete its contents first
                newCursorPosition = [index - 1, ...subPosition];
            } else {
                // the node left to the cursor has no sub-positions, so delete it
                newElements.splice(index - 1, 1);
                newCursorPosition = [index - 1];
            }
        } else {
            // ask the element we're inside to delete something inside it first
            const subResult = newElements[index].deleteLeft(remainingIndices as CursorPosition);
            if (subResult !== null) {
                // successfully deleted something inside the element
                newElements[index] = subResult.formulaNode;
                newCursorPosition = [index, ...subResult.cursorPosition];
            } else if (newElements[index].hasUserInsertedSubContent()) {
                // the element is not empty, but we could not delete something inside it (i.e. the cursor was at the
                // leftmost position inside the element, but there was content to the right of it). In that case, we'll
                // only move the cursor out of the element.
                newCursorPosition = [index];
            } else {
                // we could not delete anything inside that element because it is empty already, so we can delete it
                newElements.splice(index, 1);
                newCursorPosition = [index];
            }
        }
        return {
            formulaNode: new SequenceNode(newElements),
            cursorPosition: newCursorPosition,
        };
    }

    deleteRight([index, ...remainingIndices]: CursorPosition): FormulaNodeAndCursorPosition | null {
        const newElements = [...this.elements];
        let newCursorPosition: CursorPosition;
        if (remainingIndices.length === 0) {
            // we're not inside an element
            if (index === this.elements.length) {
                // we're at the end of this node, so return to the caller that we cannot delete anything inside it
                return null;
            }
            const subPosition = newElements[index].getFirstCursorPosition();
            if (subPosition !== null) {
                // move the cursor into the element to the left, to delete its contents first
                newCursorPosition = [index, ...subPosition];
            } else {
                // the node left to the cursor has no sub-positions, so delete it
                newElements.splice(index, 1);
                newCursorPosition = [index];
            }
        } else {
            // ask the element we're inside to delete something inside it first
            const subResult = newElements[index].deleteRight(remainingIndices as CursorPosition);
            if (subResult !== null) {
                // successfully deleted something inside the element
                newElements[index] = subResult.formulaNode;
                newCursorPosition = [index, ...subResult.cursorPosition];
            } else if (newElements[index].hasUserInsertedSubContent()) {
                // the element is not empty, but we could not delete something inside it (i.e. the cursor was at the
                // leftmost position inside the element, but there was content to the right of it). In that case, we'll
                // only move the cursor out of the element.
                newCursorPosition = [index + 1];
            } else {
                // we could not delete anything inside that element because it is empty already, so we can delete it
                newElements.splice(index, 1);
                newCursorPosition = [index];
            }
        }
        return {
            formulaNode: new SequenceNode(newElements),
            cursorPosition: newCursorPosition,
        };
    }
    
    hasUserInsertedSubContent(): boolean {
        // Any element, no matter what it is, counts as user-inserted because the user can edit the whole sequence.
        // On the other hand, if this sequence has no elements, then there are no sub-node that would hold any
        // user-inserted content.
        return this.elements.length !== 0;
    }

    convertToLatex(): string {
        return this.elements.map(element => element.convertToLatex()).join("");
    }
    
}

export class Atom implements FormulaNode {

    private readonly latex: string;

    constructor(latex: string) {
        this.latex = latex;
    }

    getFirstCursorPosition(): CursorPosition | null {
        return null;
    }

    getLastCursorPosition(): CursorPosition | null {
        return null;
    }

    getNextCursorPosition(_currentPosition: CursorPosition): CursorPosition | null {
        return null;
    }

    getPreviousCursorPosition(_currentPosition: CursorPosition): CursorPosition | null {
        return null;
    }

    insertLeft(currentPosition: CursorPosition, _what: FormulaNode): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    insertRight(currentPosition: CursorPosition, _what: FormulaNode): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    deleteLeft(_currentPosition: CursorPosition): FormulaNodeAndCursorPosition | null {
        return null;
    }

    deleteRight(_currentPosition: CursorPosition): FormulaNodeAndCursorPosition | null {
        return null;
    }

    hasUserInsertedSubContent(): boolean {
        return false;
    }

    convertToLatex(): string {
        return this.latex;
    }

}

export abstract class AbstractRigidNode implements FormulaNode {

    private readonly children: FormulaNode[];
    
    protected constructor(children: FormulaNode[]) {
        this.children = children;
    }

    getFirstCursorPosition(): CursorPosition | null {
        for (const child of this.children) {
            const result = child.getFirstCursorPosition();
            if (result) {
                return result;
            }
        }
        return null;
    }

    getLastCursorPosition(): CursorPosition | null {
        for (const child of [...this.children].reverse()) {
            const result = child.getLastCursorPosition();
            if (result) {
                return result;
            }
        }
        return null;
    }

    getNextCursorPosition([index, ...remainingIndices]: CursorPosition): CursorPosition | null {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return this.getFirstCursorPosition();
        }
        while (index < this.children.length) {
            const subResult = this.children[index].getNextCursorPosition(remainingIndices as CursorPosition);
            if (subResult != null) {
                return [index, ...subResult];
            }
            index++;
        }
        return null;
    }

    getPreviousCursorPosition([index, ...remainingIndices]: CursorPosition): CursorPosition | null {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return this.getFirstCursorPosition();
        }
        while (index >= 0) {
            const subResult = this.children[index].getPreviousCursorPosition(remainingIndices as CursorPosition);
            if (subResult != null) {
                return [index, ...subResult];
            }
            index--;
        }
        return null;
    }

    insertLeft([index, ...remainingIndices]: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return { formulaNode: this, cursorPosition: [index, ...remainingIndices]};
        }
        const result = this.children[index].insertLeft(remainingIndices as CursorPosition, what);
        return {
            formulaNode: this.withChildReplaced(index, result.formulaNode),
            cursorPosition: [index, ...result.cursorPosition],
        };
    }

    insertRight([index, ...remainingIndices]: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return { formulaNode: this, cursorPosition: [index, ...remainingIndices]};
        }
        const result = this.children[index].insertRight(remainingIndices as CursorPosition, what);
        return {
            formulaNode: this.withChildReplaced(index, result.formulaNode),
            cursorPosition: [index, ...result.cursorPosition],
        };
    }

    deleteLeft([index, ...remainingIndices]: CursorPosition): FormulaNodeAndCursorPosition | null {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return null;
        }
        const result = this.children[index].deleteLeft(remainingIndices as CursorPosition);
        if (result === null) {
            const newPosition = this.getPreviousCursorPosition([index, ...remainingIndices]);
            return newPosition ? { formulaNode: this, cursorPosition: newPosition} : null;
        }
        return {
            formulaNode: this.withChildReplaced(index, result.formulaNode),
            cursorPosition: [index, ...result.cursorPosition],
        };
    }

    deleteRight([index, ...remainingIndices]: CursorPosition): FormulaNodeAndCursorPosition | null {
        if (index < 0 || index >= this.children.length || remainingIndices.length === 0) {
            return null;
        }
        const result = this.children[index].deleteRight(remainingIndices as CursorPosition);
        if (result === null) {
            const newPosition = this.getNextCursorPosition([index, ...remainingIndices]);
            return newPosition ? { formulaNode: this, cursorPosition: newPosition} : null;
        }
        return {
            formulaNode: this.withChildReplaced(index, result.formulaNode),
            cursorPosition: [index, ...result.cursorPosition],
        };
    }

    hasUserInsertedSubContent(): boolean {
        for (const child of this.children) {
            if (child.hasUserInsertedSubContent()) {
                return true;
            }
        }
        return false;
    }

    abstract convertToLatex(): string;
    
    protected clone(): typeof this {
        return new (this.constructor as any)(this.children);
    }
    
    protected withChildReplaced(index: number, newChild: FormulaNode): typeof this {
        if (index < 0 || index >= this.children.length) {
            throw new Error();
        }
        const clone = this.clone();
        (clone as any).children = [...clone.children];
        (clone as any).children[index] = newChild;
        return clone;
    }

    protected convertChildToLatex(index: number): string {
        return this.children[index].convertToLatex();
    }

}

export function sanitizeRigitNodeChildren(children: FormulaNode[], count: number): FormulaNode[] {
    children = [...children];
    if (children.length > count) {
        children = children.slice(0, count);
    }
    while (children.length < count) {
        children.push(new Atom("???"));
    }
    return children;
}

export class SumNode extends AbstractRigidNode {

    constructor(children: [FormulaNode, FormulaNode, FormulaNode]) {
        super(sanitizeRigitNodeChildren(children, 3));
    }

    convertToLatex(): string {
        const a = this.convertChildToLatex(0);
        const b = this.convertChildToLatex(1);
        const c = this.convertChildToLatex(2);
        return `#sum_{${a}^{${b}}(${c})`;
    }

}
