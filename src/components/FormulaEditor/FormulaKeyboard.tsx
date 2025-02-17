import styles from "./FormulaKeyboard.module.css";

export interface FormulaKeyboardProps {
    onClickNumber: (x: number) => void;
    onClickErase: () => void;
    onClickConfirm: () => void;
    visible?: boolean;
}

export function FormulaKeyboard(props: FormulaKeyboardProps) {
    const visible = props.visible ?? true;
    return <table className={styles.formulaKeyboard} style={{visibility: visible ? "visible": "hidden"}}>
        <tbody>
            <tr>
                {[1, 2, 3, 4, 5].map(x => <td onClick={() => visible && props.onClickNumber(x)}>{x}</td>)}
                <td onClick={() => visible && props.onClickErase()}>⌫</td>
            </tr>
            <tr>
                {[6, 7, 8, 9, 0].map(x => <td onClick={() => visible && props.onClickNumber(x)}>{x}</td>)}
                <td onClick={() => visible && props.onClickConfirm()}>✓</td>
            </tr>
        </tbody>
    </table>;
}
