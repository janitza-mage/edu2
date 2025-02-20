import {
    AbstractRigidNode,
    Atom,
    CursorPosition,
    FormulaNode,
    FormulaNodeAndCursorPosition,
    SequenceNode,
    SumNode
} from "./FormulaNode";

/*
We'll cast to non-null (using '!') in various places in these tests, then use expect() in the next line to make
sure the value isn't null. We have to do it this way because expect() does not give that information back to the
type system.
 */

function atom(content: string) {
    return new Atom(content);
}

function seq(...nodes: FormulaNode[]) {
    return new SequenceNode(nodes);
}

function sumOf(a: FormulaNode, b: FormulaNode, c: FormulaNode) {
    return new SumNode([a, b, c]);
}

function sum() {
    return sumOf(seq(), seq(), seq());
}

const inserted = atom("inserted");

it("sequence with sum with empty content", () => {
    const node = seq(sum());

    checkForwardPositions(node, [[0], [0, 0, 0], [0, 1, 0], [0, 2, 0], [1]]);
    checkBackwardPositions(node, [[1], [0, 2, 0], [0, 1, 0], [0, 0, 0], [0]]);

    checkInsert(node, [0], seq(inserted, sum()));
    checkInsert(node, [0, 0, 0], seq(sumOf(seq(inserted), seq(), seq())));
    checkInsert(node, [0, 1, 0], seq(sumOf(seq(), seq(inserted), seq())));
    checkInsert(node, [0, 2, 0], seq(sumOf(seq(), seq(), seq(inserted))));
    checkInsert(node, [1], seq(sum(), inserted));
    
    checkDeleteLeftFails(node, [0]);
    checkDeleteLeft(node, [0, 0, 0], seq(), [0]);
    checkDeleteLeft(node, [0, 1, 0], node, [0, 0, 0]);
    checkDeleteLeft(node, [0, 2, 0], node, [0, 1, 0]);
    checkDeleteLeft(node, [1], node, [0, 2, 0]);
    
    checkDeleteRight(node, [0], node, [0, 0, 0]);
    checkDeleteRight(node, [0, 0, 0], node, [0, 1, 0]);
    checkDeleteRight(node, [0, 1, 0], node, [0, 2, 0]);
    checkDeleteRight(node, [0, 2, 0], seq(), [0]);
    checkDeleteRightFails(node, [1]);
});

it("sequence with sum with non-empty content", () => {
    const ab = seq(atom("a"), atom("b"));
    const cd = seq(atom("c"), atom("d"));
    const ef = seq(atom("e"), atom("f"));
    const node = seq(sumOf(ab, cd, ef));

    checkForwardPositions(node, [[0], [0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 1, 0], [0, 1, 1], [0, 1, 2],
        [0, 2, 0], [0, 2, 1], [0, 2, 2], [1]]);
    checkBackwardPositions(node, [[1], [0, 2, 2], [0, 2, 1], [0, 2, 0], [0, 1, 2], [0, 1, 1], [0, 1, 0],
        [0, 0, 2], [0, 0, 1], [0, 0, 0], [0]]);

    checkInsert(node, [0], seq(inserted, sumOf(ab, cd, ef)));
    checkInsert(node, [0, 0, 0], seq(sumOf(seq(inserted, atom("a"), atom("b")), cd, ef)));
    checkInsert(node, [0, 0, 1], seq(sumOf(seq(atom("a"), inserted, atom("b")), cd, ef)));
    checkInsert(node, [0, 0, 2], seq(sumOf(seq(atom("a"), atom("b"), inserted), cd, ef)));
    checkInsert(node, [0, 1, 0], seq(sumOf(ab, seq(inserted, atom("c"), atom("d")), ef)));
    checkInsert(node, [0, 1, 1], seq(sumOf(ab, seq(atom("c"), inserted, atom("d")), ef)));
    checkInsert(node, [0, 1, 2], seq(sumOf(ab, seq(atom("c"), atom("d"), inserted), ef)));
    checkInsert(node, [0, 2, 0], seq(sumOf(ab, cd, seq(inserted, atom("e"), atom("f")))));
    checkInsert(node, [0, 2, 1], seq(sumOf(ab, cd, seq(atom("e"), inserted, atom("f")))));
    checkInsert(node, [0, 2, 2], seq(sumOf(ab, cd, seq(atom("e"), atom("f"), inserted))));
    checkInsert(node, [1], seq(sumOf(ab, cd, ef), inserted));
    
    checkDeleteLeftFails(node, [0]);
    checkDeleteLeft(node, [0, 0, 0], node, [0]);
    checkDeleteLeft(node, [0, 0, 1], seq(sumOf(seq(atom("b")), cd, ef)), [0, 0, 0]);
    checkDeleteLeft(node, [0, 0, 2], seq(sumOf(seq(atom("a")), cd, ef)), [0, 0, 1]);
    checkDeleteLeft(node, [0, 1, 0], node, [0, 0, 2]);
    checkDeleteLeft(node, [0, 1, 1], seq(sumOf(ab, seq(atom("d")), ef)), [0, 1, 0]);
    checkDeleteLeft(node, [0, 1, 2], seq(sumOf(ab, seq(atom("c")), ef)), [0, 1, 1]);
    checkDeleteLeft(node, [0, 2, 0], node, [0, 1, 2]);
    checkDeleteLeft(node, [0, 2, 1], seq(sumOf(ab, cd, seq(atom("f")))), [0, 2, 0]);
    checkDeleteLeft(node, [0, 2, 2], seq(sumOf(ab, cd, seq(atom("e")))), [0, 2, 1]);
    checkDeleteLeft(node, [1], node, [0, 2, 2]);
    
    checkDeleteRight(node, [0], node, [0, 0, 0]);
    checkDeleteRight(node, [0, 0, 0], seq(sumOf(seq(atom("b")), cd, ef)), [0, 0, 0]);
    checkDeleteRight(node, [0, 0, 1], seq(sumOf(seq(atom("a")), cd, ef)), [0, 0, 1]);
    checkDeleteRight(node, [0, 0, 2], node, [0, 1, 0]);
    checkDeleteRight(node, [0, 1, 0], seq(sumOf(ab, seq(atom("d")), ef)), [0, 1, 0]);
    checkDeleteRight(node, [0, 1, 1], seq(sumOf(ab, seq(atom("c")), ef)), [0, 1, 1]);
    checkDeleteRight(node, [0, 1, 2], node, [0, 2, 0]);
    checkDeleteRight(node, [0, 2, 0], seq(sumOf(ab, cd, seq(atom("f")))), [0, 2, 0]);
    checkDeleteRight(node, [0, 2, 1], seq(sumOf(ab, cd, seq(atom("e")))), [0, 2, 1]);
    checkDeleteRight(node, [0, 2, 2], node, [1]);
    checkDeleteRightFails(node, [1]);
});

it("single toplevel sum formula with empty content", () => {
    const node = sum();
    checkForwardPositions(node, [[0, 0], [1, 0], [2, 0]]);
    checkBackwardPositions(node, [[2, 0], [1, 0], [0, 0]]);

    checkInsert(node, [0, 0], sumOf(seq(inserted), seq(), seq()));
    checkInsert(node, [1, 0], sumOf(seq(), seq(inserted), seq()));
    checkInsert(node, [2, 0], sumOf(seq(), seq(), seq(inserted)));

    checkDeleteLeftFails(node, [0, 0]);
    checkDeleteLeft(node, [1, 0], node, [0, 0]);
    checkDeleteLeft(node, [2, 0], node, [1, 0]);

    checkDeleteRight(node, [0, 0], node, [1, 0]);
    checkDeleteRight(node, [1, 0], node, [2, 0]);
    checkDeleteRightFails(node, [2, 0]);
});

it("single toplevel sum formula with non-empty content", () => {
    const ab = seq(atom("a"), atom("b"));
    const cd = seq(atom("c"), atom("d"));
    const ef = seq(atom("e"), atom("f"));
    const node = sumOf(ab, cd, ef);
    
    checkForwardPositions(node, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]);
    checkBackwardPositions(node, [[2, 2], [2, 1], [2, 0], [1, 2], [1, 1], [1, 0], [0, 2], [0, 1], [0, 0]]);

    checkInsert(node, [0, 0], sumOf(seq(inserted, atom("a"), atom("b")), cd, ef));
    checkInsert(node, [0, 1], sumOf(seq(atom("a"), inserted, atom("b")), cd, ef));
    checkInsert(node, [0, 2], sumOf(seq(atom("a"), atom("b"), inserted), cd, ef));
    checkInsert(node, [1, 0], sumOf(ab, seq(inserted, atom("c"), atom("d")), ef));
    checkInsert(node, [1, 1], sumOf(ab, seq(atom("c"), inserted, atom("d")), ef));
    checkInsert(node, [1, 2], sumOf(ab, seq(atom("c"), atom("d"), inserted), ef));
    checkInsert(node, [2, 0], sumOf(ab, cd, seq(inserted, atom("e"), atom("f"))));
    checkInsert(node, [2, 1], sumOf(ab, cd, seq(atom("e"), inserted, atom("f"))));
    checkInsert(node, [2, 2], sumOf(ab, cd, seq(atom("e"), atom("f"), inserted)));
});

// --------------------------------------------------------------------------------------------------------------------
// helpers
// --------------------------------------------------------------------------------------------------------------------

function checkForwardPositions(root: FormulaNode, expectedPositions: CursorPosition[]) {
    let position = root.getFirstCursorPosition();
    for (const expectedPosition of expectedPositions) {
        expect(position).toStrictEqual(expectedPosition);
        position = root.getNextCursorPosition(position!);
    }
    expect(position).toBeNull();
}

function checkBackwardPositions(root: FormulaNode, expectedPositions: CursorPosition[]) {
    let position = root.getLastCursorPosition();
    for (const expectedPosition of expectedPositions) {
        expect(position).toStrictEqual(expectedPosition);
        position = root.getPreviousCursorPosition(position!);
    }
    expect(position).toBeNull();
}

function expectFormulaEquals(a: FormulaNode, b: FormulaNode): void {
    expect(a.constructor).toBe(b.constructor);
    if (a instanceof SequenceNode) {
        expect((a as any).elements).toStrictEqual((b as any).elements);
    } else if (a instanceof AbstractRigidNode) {
        expect((a as any).children).toStrictEqual((b as any).children);
    }
}

function expectFormulaAndPositionEquals(a: FormulaNodeAndCursorPosition, b: FormulaNodeAndCursorPosition): void {
    expectFormulaEquals(a.formulaNode, b.formulaNode);
    expect(a.cursorPosition).toStrictEqual(b.cursorPosition);
}

function checkInsert(
    root: FormulaNode,
    position: CursorPosition,
    expectedFormula: FormulaNode
): void {
    const modifiedPosition: CursorPosition = [...position];
    modifiedPosition[modifiedPosition.length - 1]++;
    expectFormulaAndPositionEquals(root.insertLeft(position, inserted), {
        formulaNode: expectedFormula,
        cursorPosition: modifiedPosition,
    });
    expectFormulaAndPositionEquals(root.insertRight(position, inserted), {
        formulaNode: expectedFormula,
        cursorPosition: position,
    });
}

function checkDeleteLeft(
    oldRoot: FormulaNode,
    oldPosition: CursorPosition,
    expectedRoot: FormulaNode,
    expectedPosition: CursorPosition
): void {
    const actual = oldRoot.deleteLeft(oldPosition);
    expect(actual).not.toBeNull();
    if (!actual) {
        return;
    }
    const { formulaNode: actualRoot, cursorPosition: actualPosition } = actual;
    expect(actualRoot).toStrictEqual(expectedRoot);
    expect(actualPosition).toStrictEqual(expectedPosition);
}

function checkDeleteLeftFails(
    oldRoot: FormulaNode,
    oldPosition: CursorPosition
): void {
    expect(oldRoot.deleteLeft(oldPosition)).toBeNull();
}

function checkDeleteRight(
    oldRoot: FormulaNode,
    oldPosition: CursorPosition,
    expectedRoot: FormulaNode,
    expectedPosition: CursorPosition
): void {
    const actual = oldRoot.deleteRight(oldPosition);
    expect(actual).not.toBeNull();
    if (!actual) {
        return;
    }
    const { formulaNode: actualRoot, cursorPosition: actualPosition } = actual;
    expect(actualRoot).toStrictEqual(expectedRoot);
    expect(actualPosition).toStrictEqual(expectedPosition);
}

function checkDeleteRightFails(
    oldRoot: FormulaNode,
    oldPosition: CursorPosition
): void {
    expect(oldRoot.deleteRight(oldPosition)).toBeNull();
}
