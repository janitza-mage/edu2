import {FormulaNode} from "./FormulaNode";

/*
Concept:
- a cursor position consists of a number of levels, each having an index
- each index selects the next element in a formula node
- a formula node that cannot deal with cursors at all (such as atoms) can, at most, be the "leaf" selected by a cursor
    position, and only if the parent node shields it from having to deal with cursors. Examples:
    - an atom cannot deal with additional position indices
    - an atom as part of a sequence can be the leaf selected by a position
    - an atom as part of a sum-like cannot be the leaf selected by a position, because sum-likes cannot shield their
        children from having to deal with cursors
    - in fact, the children of a sum-like cannot be the nodes selected by a cursor position at all

... might want to re-define this based on a sequence of possible cursor positions that each node defines, and how
such a position is to be encoded as a tuple of indices:

- an atom does not define possible positions
- a sequence defines possible positions between each pair of elements (with the last position index being the number
    of sequence elements left to the cursor)
- a sequence promotes all possible positions from each element, with the index of that element being part of the
    position encoding, followed by the encoding of the position within the target element
- s sum-like does not define positions itself, but promotes all positions from its children, following a 0,1,2 index
    in the encoding that selects the bottom, top or content part.
 */

export type StructuredFormulaCursorPosition = number[];

function errorAtom(message: string): FormulaNode {
    return { type: "atom", content: `???cursor:${message}???` };
}

export function insertIntoStructuredFormula(
    formula: FormulaNode,
    position: StructuredFormulaCursorPosition,
    what: FormulaNode,
): FormulaNode {
    if (position.length === 0) {
        return errorAtom("noMorePositionElements");
    }
    const [nextIndex, ...remainingIndices] = position;
    switch (formula.type) {
        
        // reaching an atom here means that the cursor position is inconsistent
        case "atom":
            return errorAtom("atom");
            
        case "sequence":
            if (nextIndex < 0 || nextIndex > formula.elements.length) {
                return errorAtom("sequence:index:general");
            } else if (remainingIndices.length === 0) {
                return {
                    type: "sequence",
                    elements: [
                        ...formula.elements.slice(0, nextIndex),
                        what,
                        ...formula.elements.slice(nextIndex),
                    ],
                };
            } else if (nextIndex === formula.elements.length) {
                return errorAtom("sequence:index:descend");
            } else {
                return {
                    type: "sequence",
                    elements: [
                        ...formula.elements.slice(0, nextIndex),
                        insertIntoStructuredFormula(formula.elements[nextIndex], remainingIndices, what),
                        ...formula.elements.slice(nextIndex + 1),
                    ],
                };
            }

        case "sumLike":
            if (nextIndex < 0 || nextIndex > 2) {
                return errorAtom("sum:index");
            }
            // TODO wrong only returns the modified part not the whole
            return insertIntoStructuredFormula(
                [formula.bottom, formula.top, formula.content][nextIndex],
                remainingIndices,
                what
            );
            
        case "cursor":
            return errorAtom("cursor");

    }
}

// export function moveCursorLeft(formula: FormulaNode, position: StructuredFormulaCursorPosition): StructuredFormulaCursorPosition {
//     const res
// }
//
// function tryMoveCursorLeft(formula: FormulaNode, position: StructuredFormulaCursorPosition): StructuredFormulaCursorPosition | null {
//
// }
//
// export function moveCursorRight(formula: FormulaNode, position: StructuredFormulaCursorPosition): StructuredFormulaCursorPosition {
//    
// }
