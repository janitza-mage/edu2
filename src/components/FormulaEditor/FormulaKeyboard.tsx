import styles from "./FormulaKeyboard.module.css";
import {FormulaNode} from "./FormulaNode";
import {ReactNode} from "react";

export interface FormulaKeyboardProps {
    formulaKeys: [ReactNode, FormulaNode][];
    onClickInsertFormulaNode: (node: FormulaNode) => void;
    onClickDeleteLeft: () => void;
    onClickDeleteRight: () => void;
    onClickMoveLeft: () => void;
    onClickMoveRight: () => void;
    onClickConfirm: () => void;
    visible?: boolean;
}

const maxUserDefinedKeysFirstRow = 4;
const maxUserDefinedKeysSecondRow = 3;
const maxUserDefinedKeys = maxUserDefinedKeysFirstRow + maxUserDefinedKeysSecondRow;

export function FormulaKeyboard(props: FormulaKeyboardProps) {
    const keys = normalizeKeys(props.formulaKeys);
    const firstRowKeys = keys.slice(0, maxUserDefinedKeysFirstRow);
    const secondRowKeys = keys.slice(maxUserDefinedKeysFirstRow);
    
    const visible = props.visible ?? true;
    return <table className={styles.formulaKeyboard} style={{visibility: visible ? "visible": "hidden"}}>
        <tbody>
            <tr>
                {firstRowKeys.map(x => <td onClick={() => visible && x[1] && props.onClickInsertFormulaNode(x[1])}>
                    {x[0]}
                </td>)}
                <td onClick={() => visible && props.onClickDeleteLeft()}>⌫</td>
                <td onClick={() => visible && props.onClickDeleteRight()}>⌦</td>
            </tr>
            <tr>
                {secondRowKeys.map(x => <td onClick={() => visible && x[1] && props.onClickInsertFormulaNode(x[1])}>
                    {x[0]}
                </td>)}
                <td onClick={() => visible && props.onClickMoveLeft()}>⬅</td>
                <td onClick={() => visible && props.onClickMoveRight()}>➡</td>
                <td onClick={() => visible && props.onClickConfirm()}>✓</td>
            </tr>
        </tbody>
    </table>;
}

function normalizeKeys(keys: [ReactNode, FormulaNode][]): [ReactNode, FormulaNode | null][] {
    const result: [ReactNode, FormulaNode | null][] = [...keys];
    if (result.length > maxUserDefinedKeys) {
        return result.slice(0, maxUserDefinedKeys);
    }
    while (result.length < maxUserDefinedKeys) {
        result.push([null, null]);
    }
    return result;
}
