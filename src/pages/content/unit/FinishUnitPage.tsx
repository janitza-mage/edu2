import {Button} from "@mui/material";
import {MiniPie} from "../../../components/MiniPie/MiniPie";
import {calculateFloatScore, calculateIntScore} from "./calculateScore";

export interface FinishUnitPageProps {
    progressCounter: number;
    mistakeCounter: number;
    onRepeat: () => void;
    onContinue: () => void;
}

export function FinishUnitPage(props: FinishUnitPageProps) {
    return <div style={{textAlign: "center", marginTop: "3em"}}>
        <div style={{textAlign: "center", marginBottom: "1em"}}>
            Du hast {calculateIntScore(props.progressCounter, props.mistakeCounter)} von 10 Punkten erreicht.
        </div>
        <div style={{textAlign: "center", marginBottom: "2em"}}>
            <MiniPie score={calculateFloatScore(props.progressCounter, props.mistakeCounter)} size={"50%"} resolution={100} />
        </div>
        <div>
            <Button variant={"text"} onClick={props.onRepeat}>wiederholen</Button>
            <Button variant={"contained"} onClick={props.onContinue}>weiter</Button>
        </div>
    </div>;
}
