import {CSSProperties, ReactNode} from "react";

/**
 * w = white
 * b = blue, B = strong blue
 * r = red, R = strong red
 * 0 = lower half is strong red, upper half is blue
 */
export function createBoxMatrix(matrixSpec: string[]): ReactNode {
    return <table style={{borderCollapse: "collapse"}}>
        <tbody>
        {matrixSpec.map((rowSpec, rowIndex) => <tr key={rowIndex}>
            {rowSpec.split("").map((cellSpec, cellIndex) =>
                <td key={cellIndex} style={getCellStyle(cellSpec)}>
                    {getCellContents(cellSpec)}
                </td>
            )}
        </tr>)}
        </tbody>
    </table>;
}

function getCellStyle(cellSpec: string): CSSProperties {
    const base = {width: "1em", height: "1em", border: "1px solid #aaa"};
    switch (cellSpec) {
        case "0":
        case "b":
            return {...base, backgroundColor: "#88f"};
        case "B":
            return {...base, backgroundColor: "#44f"};
        case "r":
            return {...base, backgroundColor: "#f88"};
        case "R":
        case "1":
            return {...base, backgroundColor: "#f44"};
        case "w":
        default:
            return base;
    }
}

function getCellContents(cellSpec: string): ReactNode {
    switch (cellSpec) {
        case "0":
            return <div style={{width: "0px", height: "0px", borderBottom: "1em solid #f44", borderRight: "1em solid transparent"}}></div>;
        case "1":
            return <div style={{width: "0px", height: "0px", borderTop: "1em solid #4f4", borderLeft: "1em solid transparent"}}></div>;
        default:
            return null;
    }
}
