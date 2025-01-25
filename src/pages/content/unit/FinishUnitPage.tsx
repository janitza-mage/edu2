import {Button} from "@mui/material";
import {MiniPie} from "../../../components/MiniPie/MiniPie";
import {calculateScore} from "./calculateScore";

export interface FinishUnitPageProps {
    progressCounter: number;
    mistakeCounter: number;
    onRepeat: () => void;
    onContinue: () => void;
}

export function FinishUnitPage(props: FinishUnitPageProps) {
    return <div style={{textAlign: "center", marginTop: "3em"}}>
        <div style={{textAlign: "center", marginBottom: "1em"}}>
            Du hast {calculateScore(props.progressCounter, props.mistakeCounter)} von 10 Punkten erreicht.
        </div>
        <div style={{textAlign: "center", marginBottom: "2em"}}>
            <MiniPie green={props.progressCounter} red={props.mistakeCounter} grey={0} size={"50%"} resolution={100} />
        </div>
        <div>
            <Button variant={"text"} onClick={props.onRepeat}>wiederholen</Button>
            <Button variant={"contained"} onClick={props.onContinue}>weiter</Button>
        </div>
    </div>;
}
