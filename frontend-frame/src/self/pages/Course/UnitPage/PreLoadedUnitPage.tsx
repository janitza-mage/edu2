import {useCallback, useRef, useState} from "react";
import {CourseDetailState} from "../../../logic/state/StateStore";
import {useStateStore} from "../../../logic/state/useStateStore";
import {useNavigate} from "react-router-dom";
import {background} from "../../../../common/util/background";
import {RegularUnitPageFrameResponse} from "../../../../common/frontend-api/GetUnitPageFrameResponse";
import {commonSystemConfiguration} from "../../../../common/commonSystemConfiguration";

/**
 * This state indicates the relation of the current unit index vs. the active unit index, the latter being equal
 * to the number of completed units. This state isn't explicitly stored, but derived from the unit index from the
 * props and the number of completed units from the course state.
 */
type UnitProgressionState = "active" | "lookahead" | "lookbehind";

export interface PreLoadedUnitPageProps {
    courseId: number;
    unitIndex: number;
    contentResponse: RegularUnitPageFrameResponse;
    courseDetailState: CourseDetailState;
}

export function PreLoadedUnitPage(props: PreLoadedUnitPageProps) {
    const stateStore = useStateStore();
    const navigate = useNavigate();

    // unit progression state -- used to determine whether the unit can be completed (if not, a successfully completed
    // exercise sheet will not have any effect), and for that reason this will show an alert at the top.
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

    // counted up to make the iframe reload when the "repeat" button is pressed
    const [iframeKey, setIframeKey] = useState(0);

    // The "finish unit" button either repeats the unit or advances to the next unit, depending on whether there are
    // any errors in the exercises, as well as whether this is a look-ahead or look-behind unit.
    // Advancing to the next unit will also persistently store the learner's progress in the state store.
    function finishUnit(success: boolean) {
        if (success !== null) {
            background(async () => {
                if (unitProgressionState === "active" && success) {
                    await stateStore.completeUnit(props.courseId, props.unitIndex);
                    navigate(`/courses/${props.courseId}/units/${props.unitIndex + 1}`);
                } else {
                    // reload iframe to generate new exercises and reset their state
                    setIframeKey(iframeKey + 1);
                }
            });
        }
    }

    //
    const messageHandlerRef = useRef<((event: MessageEvent) => void) | null>(null);
    function onNewIframe(iframe: HTMLIFrameElement | null) {

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
                        case "finish":
                            finishUnit(!!command.success);
                            break;
                    }
                }
            };
            window.addEventListener("message", messageHandlerRef.current);
            const baseUrl = props.contentResponse.contentUrl ?? `${commonSystemConfiguration.contentBaseUrl}/${props.courseId}/${props.unitIndex}`;
            iframe.src = baseUrl + (baseUrl.includes("?") ? "&" : "?") + "ups=" + unitProgressionState;
        }
    }
    const onNewIframeCallback = useCallback(onNewIframe, [props.courseId, props.unitIndex, props.contentResponse.contentUrl]);

    // JSX
    return <iframe
        key={iframeKey}
        ref={onNewIframeCallback}
        title="unit content"
        width="100%"
        height="100%"
        style={{border: "0px none red", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, overflow: "scroll"}}
    />;
}
