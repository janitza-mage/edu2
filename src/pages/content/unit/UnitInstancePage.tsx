import {Unit, UnitInstance} from "../../../content/types";
import CancelIcon from '@mui/icons-material/Cancel';
import {IconButton} from "@mui/material";
import {useNavigateToContentNode} from "../../../components/navigation/ContentNodeLink/useNavigateToContentNode";
import {useState} from "react";
import {FinishUnitPage} from "./FinishUnitPage";
import {getNextUnitPath} from "../../../content/paths";
import {PageWithHeader} from "../../../components/layout/PageWithHeader";
import {setUnitScore} from "../../../state/state";
import {calculateIntScore} from "./calculateScore";
import {FlashExerciseBackgroundProvider} from "../../../components/effects/useFlashExerciseBackground";

export interface UnitInstancePageProps {
    unit: Unit;
    path: string[];
    unitInstance: UnitInstance;
    onNewInstance: () => void;
}

export function UnitInstancePage(props: UnitInstancePageProps) {
    const navigateToContentNode = useNavigateToContentNode();
    const [progressCounter, setProgressCounter] = useState(0);
    const [mistakeCounter, setMistakeCounter] = useState(0);
    const [finished, setFinished] = useState(false);

    function onClickCancel() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("wirklich abbrechen?")) {
            const parentPath = [...props.path];
            parentPath.pop();
            navigateToContentNode(parentPath);
        }
    }

    function onProgress() {
        setProgressCounter(progressCounter + 1);
    }

    function onMistake() {
        setMistakeCounter(mistakeCounter + 1);
    }

    function onFinish() {
        setUnitScore(props.path, calculateIntScore(progressCounter, mistakeCounter));
        setFinished(true);
    }

    function onRepeat() {
        props.onNewInstance();
    }

    function onContinue() {
        // It is currently unclear what to do if the next unit has been finished already. Doing it again might not
        // be desired, but skipping it would be confusing. And what if it was finished, but with a low score?
        // Maybe it would be better to just show that unit anyway, but show the previous score.
        const nextUnitPath = getNextUnitPath(props.path)
        if (nextUnitPath) {
            navigateToContentNode(nextUnitPath);
        } else if (props.path.length === 0) {
            navigateToContentNode([]);
        } else {
            const parentPath = [...props.path];
            parentPath.pop();
            navigateToContentNode(parentPath);
        }
    }

    const MyUnitInstance = props.unitInstance;
    return <>
        {!finished && <PageWithHeader
            header={
                <h1 style={{margin: 0}}>
                    <IconButton onClick={onClickCancel} sx={{marginRight: "1em"}}>
                        <CancelIcon fontSize={"large"} />
                    </IconButton>
                    {props.unit.name}
                </h1>
            }
        >
            <FlashExerciseBackgroundProvider>
                <MyUnitInstance
                    onProgress={onProgress}
                    onMistake={onMistake}
                    onFinish={onFinish}
                />
            </FlashExerciseBackgroundProvider>
        </PageWithHeader>}
        {finished && <FinishUnitPage
            progressCounter={progressCounter}
            mistakeCounter={mistakeCounter}
            onRepeat={onRepeat}
            onContinue={onContinue}
        />}
    </>;
}
