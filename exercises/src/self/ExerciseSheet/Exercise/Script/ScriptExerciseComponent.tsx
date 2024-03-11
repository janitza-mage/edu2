import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {ScriptExercise} from "../../../../common/types/Exercise";
import {useEffect, useRef} from "react";

export interface ScriptContext {
    element: HTMLDivElement;
    authorId: number;
    reportResult: (correct: boolean) => void;
    adjustContainerSize: () => void;
    scrollToBottom: () => void;
}

export interface ComponentState {
    initiallyRendered: boolean;
}

export function ScriptExerciseComponent(props: ExerciseComponentProps<ScriptExercise>) {
    const stateRef = useRef<ComponentState>({
        initiallyRendered: false,
    });

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current === null) {
            return;
        }
        if (!stateRef.current.initiallyRendered) {
            const scriptContext: ScriptContext = {
                element: divRef.current,
                authorId: props.authorId,
                reportResult: props.reportResult,
                adjustContainerSize: props.adjustContainerSize,
                scrollToBottom: props.scrollToBottom,
            };
            if (typeof props.exercise.script === "string") {
                // eslint-disable-next-line no-new-func -- found no information on how to fix this
                const script = new Function("context", props.exercise.script);
                script(scriptContext);
            } else {
                props.exercise.script(scriptContext);
            }
            stateRef.current.initiallyRendered = true;
        } else {
            // TODO how can we update the component? Should the script return an object with "initial" and "update" functions?
            // Or should the component disable itself when needed so no update is needed?
            // For other components, we pass props.answered so the state is "pulled up" and the exercise component
            // does not have to manage its own state internally. In our case, "own state" exists because the DOM
            // is stateful (react acts as if it isn't), so "updating" it is actually harder than managing that state.
            // (BTW this might change when/if we switch away from react for exercises)
            // So doing this in a non-react way already means less change later.
            // --> no update; the component should disable itself when needed; NOP here
        }
    }, [props.answered]); // eslint-disable-line react-hooks/exhaustive-deps -- again, react-hooks/exhaustive-deps is wrong...

    return <div ref={divRef} />;
}
