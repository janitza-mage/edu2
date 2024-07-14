import {RefObject, useCallback, useRef, useState} from "react";
import {CourseDetailState} from "../../../logic/state/StateStore";
import {Alert, Button} from "@mui/material";
import {useStateStore} from "../../../logic/state/useStateStore";
import {useNavigate} from "react-router-dom";
import {background} from "../../../../common/util/background";
import {RegularUnitPageResponse} from "../../../../common/frontend-api/GetUnitPageResponse";
import {scrollToBottomDelayed, scrollToDelayed} from "../../../../uilib/util/scrolling";
import {commonSystemConfiguration} from "../../../../common/commonSystemConfiguration";
import {MarkdownInline} from "../../../../uilib/markdown/Markdown";

/**
 * This state indicates the relation of the current unit index vs. the active unit index, the latter being equal
 * to the number of completed units. This state isn't explicitly stored, but derived from the unit index from the
 * props and the number of completed units from the course state.
 */
type UnitProgressionState = "active" | "lookahead" | "lookbehind";

export interface PreLoadedUnitPageProps {
    courseId: number;
    unitIndex: number;
    contentResponse: RegularUnitPageResponse;
    courseDetailState: CourseDetailState;
    scrollContainerRef?: RefObject<HTMLElement | undefined> | undefined;
}

export function PreLoadedUnitPage(props: PreLoadedUnitPageProps) {
    const stateStore = useStateStore();
    const navigate = useNavigate();

    // unit progression state -- used to determine whether the unit can be completed (if not, a successfully completed
    // exercise will not have any effect), and for that reason this will show an alert at the top.
    let unitProgressionState: UnitProgressionState;
    if (props.courseDetailState.completionStatus === "completed") {
        // whole course already completed
        unitProgressionState = "lookbehind";
    } else if (props.courseDetailState.completionStatus === "new") {
        // whole course is new
        unitProgressionState = props.unitIndex > 0 ? "lookahead" : "active";
    } else if (props.courseDetailState.completedUnits === props.unitIndex) {
        // active course, current unit
        unitProgressionState = "active";
    } else if (props.courseDetailState.completedUnits < props.unitIndex) {
        // look-ahead unit
        unitProgressionState = "lookahead";
    } else {
        // look-behind unit
        unitProgressionState = "lookbehind";
    }

    // null: in progress, true: successfully finished (can continue), false: finished with errors (must be repeated)
    const [exerciseState, setExerciseState] = useState<boolean | null>(null);

    // counted up to make the iframe reload when the "repeat" button is pressed
    const [exerciseIframeKey, setExerciseIframeKey] = useState(0);

    // The "finish exercise sheet" button either repeats the exercise sheet or advances to the next unit, depending on
    // whether there are any errors in the exercises, as well as whether this is a look-ahead or look-behind unit.
    // Advancing to the next unit will also persistently store the learner's progress in the state store.
    function onFinishExerciseSheet() {
        if (exerciseState !== null) {
            background(async () => {
                if (unitProgressionState === "active" && exerciseState) {
                    await stateStore.completeUnit(props.courseId, props.unitIndex);
                    navigate(`/courses/${props.courseId}/units/${props.unitIndex + 1}`);
                } else {
                    // reload iframe to generate new exercises and reset their state
                    setExerciseIframeKey(exerciseIframeKey + 1);
                    setExerciseState(null);
                }
            });
        }
    }

    //
    const messageHandlerRef = useRef<((event: MessageEvent) => void) | null>(null);
    function onNewIframe(iframe: HTMLIFrameElement | null) {
        if (iframe === messageHandlerRef.current) {
            return;
        }

        // remove previous message handler
        if (messageHandlerRef.current) {
            window.removeEventListener("message", messageHandlerRef.current);
            messageHandlerRef.current = null;
        }

        // install new message handler and set src attribute
        if (iframe) {
            messageHandlerRef.current = (event: MessageEvent) => {
                const commands = Array.isArray(event.data) ? event.data : [event.data];
                for (const command of commands) {
                    switch (command.type) {

                        case "setHeight": {
                            let scrollTarget: number | null = null;
                            switch (command.scrollMode ?? "none") {

                                case "oldBottom":
                                    scrollTarget = iframe.scrollHeight;
                                    break;

                                case "newBottom":
                                    scrollTarget = command.height;
                                    break;

                            }
                            iframe.height = command.height;
                            if (scrollTarget !== null && props.scrollContainerRef && props.scrollContainerRef.current) {
                                const container = props.scrollContainerRef.current;
                                const iframePositionWithinContainer = iframe.getBoundingClientRect().top + container.scrollTop;
                                scrollToDelayed(container, iframePositionWithinContainer + scrollTarget);
                            }
                            break;
                        }

                        case "scrollToBottom":
                            if (props.scrollContainerRef && props.scrollContainerRef.current) {
                                scrollToBottomDelayed(props.scrollContainerRef.current);
                            }
                            break;

                        case "finish":
                            setExerciseState(!!command.success);
                            break;
                    }
                }
            };
            window.addEventListener("message", messageHandlerRef.current);
            iframe.src = props.contentResponse.exerciseUrl ?? `${commonSystemConfiguration.exerciseBaseUrl}/${props.courseId}/${props.unitIndex}`;
        }
    }
    const onNewIframeCallback = useCallback(onNewIframe, [props.courseId, props.unitIndex, props.contentResponse.exerciseUrl, props.scrollContainerRef]);

    // JSX
    return <>
        {unitProgressionState === "lookahead" && <Alert severity="error" sx={{alignItems: "center"}}>
            This unit cannot be completed yet because previous units have not been completed.
        </Alert>}
        {unitProgressionState === "lookbehind" && <Alert severity="success" sx={{alignItems: "center"}}>
            This unit has already been completed.
        </Alert>}
        <h1><MarkdownInline renderConfiguration={{courseIdForImages: null, allowDangerousProtocol: false}}>{props.contentResponse.title}</MarkdownInline></h1>
        <iframe
            key={exerciseIframeKey}
            ref={onNewIframeCallback}
            title="exercise"
            width="100%"
            height="1px" style={{border: "0px none red"}}
        />
        {exerciseState !== null && <>
            <hr/>
            <Button variant="contained" onClick={onFinishExerciseSheet}>
                {(!exerciseState || unitProgressionState !== "active") ? "Repeat exercise" : "Continue to the next unit"}
            </Button>
        </>}
    </>;
}
