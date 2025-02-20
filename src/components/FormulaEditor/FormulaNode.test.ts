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


it("sequence with sum with empty content", () => {
    const node = seq(sum());
    checkForwardPositions(node, [[0], [0, 0, 0], [0, 1, 0], [0, 2, 0], [1]]);
    checkBackwardPositions(node, [[1], [0, 2, 0], [0, 1, 0], [0, 0, 0], [0]]);
    // checkInsert(node, [0], new SequenceNode([new Atom("a"), new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()])]));
});

it("sequence with sum with non-empty content", () => {
    const node = seq(sumOf(
        seq(atom("a"), atom("b")),
        seq(atom("c"), atom("d")),
        seq(atom("e"), atom("f")),
    ));
    checkForwardPositions(node, [[0], [0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 1, 0], [0, 1, 1], [0, 1, 2],
        [0, 2, 0], [0, 2, 1], [0, 2, 2], [1]]);
    checkBackwardPositions(node, [[1], [0, 2, 2], [0, 2, 1], [0, 2, 0], [0, 1, 2], [0, 1, 1], [0, 1, 0],
        [0, 0, 2], [0, 0, 1], [0, 0, 0], [0]]);
});

it("single toplevel sum formula with empty content", () => {
    const node = sum();
    checkForwardPositions(node, [[0, 0], [1, 0], [2, 0]]);
    checkBackwardPositions(node, [[2, 0], [1, 0], [0, 0]]);
});

it("single toplevel sum formula with non-empty content", () => {
    const node = sumOf(
        seq(atom("a"), atom("b")),
        seq(atom("c"), atom("d")),
        seq(atom("e"), atom("f")),
    );
    checkForwardPositions(node, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]);
    checkBackwardPositions(node, [[2, 2], [2, 1], [2, 0], [1, 2], [1, 1], [1, 0], [0, 2], [0, 1], [0, 0]]);
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
    expectFormulaAndPositionEquals(root.insertLeft(position, new Atom("blarp")), {
        formulaNode: expectedFormula,
        cursorPosition: modifiedPosition,
    });
    expectFormulaAndPositionEquals(root.insertRight(position, new Atom("blarp")), {
        formulaNode: expectedFormula,
        cursorPosition: position,
    });
}