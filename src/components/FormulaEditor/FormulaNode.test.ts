import {SequenceNode, SumNode} from "./FormulaNode";

/*
We'll cast to non-null (using '!') in various places in these tests, then use expect() in the next line to make
sure the value isn't null. We have to do it this way because expect() does not give that information back to the
type system.
 */

it("formula with sum", () => {
    const node = new SequenceNode([new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()])]);
    expect(node.getFirstCursorPosition()).toStrictEqual([0]);
    expect(node.getLastCursorPosition()).toStrictEqual([1]);
});

it("single toplevel sum formula", () => {
    const node = new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()]);
    {
        const position1 = node.getFirstCursorPosition()!;
        expect(position1).toStrictEqual([0, 0]);
        const position2 = node.getNextCursorPosition(position1)!;
        expect(position2).toStrictEqual([1, 0]);
        const position3 = node.getNextCursorPosition(position2)!;
        expect(position3).toStrictEqual([2, 0]);
        expect(node.getNextCursorPosition(position3)).toBeNull();
    }
    {
        const position1 = node.getLastCursorPosition()!;
        expect(position1).toStrictEqual([2, 0]);
        const position2 = node.getPreviousCursorPosition(position1)!;
        expect(position2).toStrictEqual([1, 0]);
        const position3 = node.getPreviousCursorPosition(position2)!;
        expect(position3).toStrictEqual([0, 0]);
        expect(node.getPreviousCursorPosition(position3)).toBeNull();
    }
});
