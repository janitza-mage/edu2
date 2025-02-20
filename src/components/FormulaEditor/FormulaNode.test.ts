import {Atom, CursorPosition, FormulaNode, SequenceNode, SumNode} from "./FormulaNode";

/*
We'll cast to non-null (using '!') in various places in these tests, then use expect() in the next line to make
sure the value isn't null. We have to do it this way because expect() does not give that information back to the
type system.
 */

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

it("sequence with sum with empty content", () => {
    const node = new SequenceNode([new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()])]);
    checkForwardPositions(node, [[0], [0, 0, 0], [0, 1, 0], [0, 2, 0], [1]]);
    checkBackwardPositions(node, [[1], [0, 2, 0], [0, 1, 0], [0, 0, 0], [0]]);
});

it("single toplevel sum formula with empty content", () => {
    const node = new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()]);
    checkForwardPositions(node, [[0, 0], [1, 0], [2, 0]]);
    checkBackwardPositions(node, [[2, 0], [1, 0], [0, 0]]);
});

it("single toplevel sum formula with non-empty content", () => {
    const node = new SumNode([
        new SequenceNode([new Atom("a"), new Atom("b")]),
        new SequenceNode([new Atom("c"), new Atom("d")]),
        new SequenceNode([new Atom("e"), new Atom("f")]),
    ]);
    checkForwardPositions(node, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]);
    checkBackwardPositions(node, [[2, 2], [2, 1], [2, 0], [1, 2], [1, 1], [1, 0], [0, 2], [0, 1], [0, 0]]);
});
