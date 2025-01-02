import {Button} from "@mui/material";
import {CenteredContent} from "../../../components/layout/CenteredContent";
import {MiniPie} from "../../../components/MiniPie/MiniPie";

export interface FinishUnitPageProps {
    progressCounter: number;
    mistakeCounter: number;
    onRepeat: () => void;
    onContinue: () => void;
}

export function FinishUnitPage(props: FinishUnitPageProps) {
    return <CenteredContent widthPercent={50}>
        <div style={{textAlign: "center", marginBottom: "2em"}}>
            <MiniPie green={props.progressCounter} red={props.mistakeCounter} grey={0} size={"50%"} resolution={100} />
        </div>
        <div>
            <Button variant={"text"} onClick={props.onRepeat}>wiederholen</Button>
            <Button variant={"contained"} onClick={props.onContinue}>weiter</Button>
        </div>
    </CenteredContent>;
}
