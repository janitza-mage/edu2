import styles from "./NumberKeyboard.module.css";

export interface NumberKeyboardProps {
    onClickNumber: (x: number) => void;
    onClickErase: () => void;
    onClickConfirm: () => void;
}

export function NumberKeyboard(props: NumberKeyboardProps) {
    return <table className={styles.numberKeyboard}>
        <tbody>
            <tr>
                {[1, 2, 3, 4, 5].map(x => <td onClick={() => props.onClickNumber(x)}>{x}</td>)}
                <td onClick={props.onClickErase}>⌫</td>
            </tr>
            <tr>
                {[6, 7, 8, 9, 0].map(x => <td onClick={() => props.onClickNumber(x)}>{x}</td>)}
                <td onClick={props.onClickConfirm}>✓</td>
            </tr>
        </tbody>
    </table>;
}
