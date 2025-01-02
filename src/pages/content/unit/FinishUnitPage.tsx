import {Button} from "@mui/material";
import {CenteredContent} from "../../../components/layout/CenteredContent";

export interface FinishUnitPageProps {
    progressCounter: number;
    mistakeCounter: number;
    onRepeat: () => void;
    onContinue: () => void;
}

export function FinishUnitPage(props: FinishUnitPageProps) {
    return <CenteredContent widthPercent={50}>
        <div>progress: {props.progressCounter}</div>
        <div>mistakes: {props.mistakeCounter}</div>
        <div>
            <Button variant={"text"} onClick={props.onRepeat}>wiederholen</Button>
            <Button variant={"contained"} onClick={props.onContinue}>weiter</Button>
        </div>
    </CenteredContent>;
}
