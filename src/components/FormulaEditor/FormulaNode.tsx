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

    deleteLeft(currentPosition: CursorPosition): FormulaNodeAndCursorPosition;

    deleteRight(currentPosition: CursorPosition): FormulaNodeAndCursorPosition;

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
        if (remainingIndices.length === 0) {
            // we're not inside an element
            if (index === this.elements.length) {
                // after last element
                return null;
            } else {
                // between two elements, so enter next element
                const result = this.elements[index].getFirstCursorPosition();
                if (result === null) {
                    // that element has no insertable places, so skip it and place the cursor directly behind it
                    return [index + 1];
                } else {
                    // successfully entered that element
                    return [index, ...result];
                }
            }
        } else {
            // we are inside an element (the type-cast is justified because of the enclosing if-statement -- Typescript
            // just doesn't realize it)
            const result = this.elements[index].getNextCursorPosition(remainingIndices as CursorPosition);
            if (result === null) {
                // we are at the end of the element, so the next position is between it and the next one 
                return [index + 1];
            } else {
                // successfully moved within that element
                return [index, ...result];
            }
        }
    }

    getPreviousCursorPosition(currentPosition: CursorPosition): CursorPosition | null {
    }

    insertLeft(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
    }

    insertRight(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
    }

    deleteLeft(currentPosition: CursorPosition): FormulaNodeAndCursorPosition {
    }

    deleteRight(currentPosition: CursorPosition): FormulaNodeAndCursorPosition {
    }

    convertToLatex(): string {
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

    getNextCursorPosition(currentPosition: CursorPosition): CursorPosition | null {
        return null;
    }

    getPreviousCursorPosition(currentPosition: CursorPosition): CursorPosition | null {
        return null;
    }

    insertLeft(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    insertRight(currentPosition: CursorPosition, what: FormulaNode): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    deleteLeft(currentPosition: CursorPosition): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    deleteRight(currentPosition: CursorPosition): FormulaNodeAndCursorPosition {
        return { formulaNode: this, cursorPosition: currentPosition };
    }

    convertToLatex(): string {
        return this.latex;
    }

}
