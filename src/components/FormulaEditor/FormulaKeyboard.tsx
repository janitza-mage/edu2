import styles from "./FormulaKeyboard.module.css";
import {Atom, FormulaNode} from "./FormulaNode";
import {ReactNode} from "react";

export interface FormulaKeyboardProps {
    formulaKeys: ([ReactNode, FormulaNode] | string)[];
    onClickInsertFormulaNode: (node: FormulaNode) => void;
    onClickDeleteLeft: () => void;
    onClickDeleteRight: () => void;
    onClickMoveLeft: () => void;
    onClickMoveRight: () => void;
    onClickReset: () => void;
    onClickConfirm: () => void;
    visible?: boolean;
}

export function FormulaKeyboard(props: FormulaKeyboardProps) {
    const visible = props.visible ?? true;
    
    const userDefinedKeys = normalizeUserDefinedKeys(props.formulaKeys, 24);
    function getUserDefinedRow(from: number, to: number): [ReactNode, () => void][] {
        const slice = userDefinedKeys.slice(from, to);
        return slice.map(([label, node]) => [label, () => node && props.onClickInsertFormulaNode(node)]);
    }
    
    const rows: [label: ReactNode, onClick: () => void][][] = [
        [...getUserDefinedRow(0, 8), ["⬅", props.onClickMoveLeft], ["➡", props.onClickMoveRight]],
        [...getUserDefinedRow(8, 16), ["⌫", props.onClickDeleteLeft], ["⌦", props.onClickDeleteRight]],
        [...getUserDefinedRow(16, 24), ["🗑", props.onClickReset], ["✓", props.onClickConfirm]],
    ]; 
    
    return <table className={styles.formulaKeyboard} style={{visibility: visible ? "visible": "hidden"}}>
        <tbody>
            {rows.map(row => <tr>
                {row.map(cell => <td onClick={() => visible && cell[1]()}>
                    {cell[0]}
                </td>)}
            </tr>)}
        </tbody>
    </table>;
}

function normalizeUserDefinedKeys(keys: ([ReactNode, FormulaNode] | string)[], max: number): [ReactNode, FormulaNode | null][] {
    const result: [ReactNode, FormulaNode | null][] = keys.map(key => {
        if (typeof key === "string") {
            return [key, new Atom(key)];
        } else {
            return key;
        }
    });
    if (result.length > max) {
        return result.slice(0, max);
    }
    while (result.length < max) {
        result.push([null, null]);
    }
    return result;
}
