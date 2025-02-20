import {SequenceNode, SumNode} from "./FormulaNode";

it("formula with sum", () => {
    const node = new SequenceNode([new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()])]);
    expect(node.getFirstCursorPosition()).toStrictEqual([0]);
    expect(node.getLastCursorPosition()).toStrictEqual([1]);
});

it("single toplevel sum formula", () => {
    const node = new SumNode([new SequenceNode(), new SequenceNode(), new SequenceNode()]);
    expect(node.getFirstCursorPosition()).toStrictEqual([0, 0]);
    expect(node.getLastCursorPosition()).toStrictEqual([2, 0]);
});
