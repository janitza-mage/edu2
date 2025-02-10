import {mathSpan} from "../../../components/Math/Math";
import {CenterBlock} from "../../../components/layout/CenterBlock";

export interface MathTableProps {
    widthPercent: number;
    headers: string[];
    cells: string[][];
}

export function MathTable(props: MathTableProps) {
    return <CenterBlock widthPercent={props.widthPercent}>
        <table className={"thinTable"} style={{width: "100%"}}>
            <thead>
            <tr>
                {props.headers.map(header => <th>{mathSpan(header)}</th>)}
            </tr>
            </thead>
            <tbody>
            {props.cells.map(row => <tr>
                {row.map(cell => <td>{mathSpan(cell)}</td>)}
            </tr>)}
            </tbody>
        </table>
    </CenterBlock>;
}
