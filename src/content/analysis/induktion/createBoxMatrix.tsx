import {CSSProperties, ReactNode} from "react";

/**
 * w = white
 * b = blue
 * r = red
 */
export function createBoxMatrix(matrixSpec: string[]): ReactNode {
    return <table style={{borderCollapse: "collapse"}}>
        <tbody>
        {matrixSpec.map((rowSpec, rowIndex) => <tr key={rowIndex}>
            {rowSpec.split("").map((cellSpec, cellIndex) =>
                <td key={cellIndex} style={getCellStyle(cellSpec)}>
                </td>
            )}
        </tr>)}
        </tbody>
    </table>;
}

function getCellStyle(cellSpec: string): CSSProperties {
    const base = {width: "1em", height: "1em", border: "1px solid #aaa"};
    switch (cellSpec) {
        case "b":
            return {...base, backgroundColor: "#88f"};
        case "r":
            return {...base, backgroundColor: "#f88"};
        default:
            return base;
    }
}