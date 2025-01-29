import styles from "./ColoredMatrix.module.css";

export interface ColoredMatrixProps {
    cellSize: string; // CSS length spec
    colors: string[][]; // should be rectangular, or chaos will happen; should contain CSS color specs
}

export function ColoredMatrix(props: ColoredMatrixProps) {
    return <table className={styles.coloredMatrix}>
        <tbody>
        {props.colors.map((row, rowIndex) => <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
                <td key={cellIndex } style={{backgroundColor: cell, width: props.cellSize, height: props.cellSize}} />
            )}
        </tr>)}
        </tbody>
    </table>;
}
