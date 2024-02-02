import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../common/types/Exercise";
import {FormEvent, useEffect, useRef} from "react";
import {allocateSyntheticIds} from "../../../util/SyntheticId";
import $ from "jquery";
import {renderFormContents} from "./renderFormContents";
import {processFormSubmission} from "./processFormSubmission";
import styles from "./FillInTheBlanksExerciseComponent.module.css";

export interface ComponentState {
    htmlId: string;
    initiallyRendered: boolean;
}

export function FillInTheBlanksExerciseComponent(props: ExerciseComponentProps<FillInTheBlanksExercise>) {
    const stateRef = useRef<ComponentState>({
        htmlId: "",
        initiallyRendered: false,
    });
    if (stateRef.current.htmlId === "") {
        stateRef.current.htmlId = "synthetic-" + allocateSyntheticIds(1);
    }

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current === null) {
            return;
        }
        if (!stateRef.current.initiallyRendered) {
            $("#" + stateRef.current.htmlId).html(renderFormContents(props));
            stateRef.current.initiallyRendered = true;
        } else {
            $("#" + stateRef.current.htmlId).find("input[type=text],select").attr("disabled", props.answered ? "disabled" : null);
        }
    }, [props.answered]);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        processFormSubmission(props, event.target as HTMLFormElement);
    }

    return <form onSubmit={onSubmit} className={styles.form}>
        <div ref={divRef} id={stateRef.current.htmlId} />
        <input type="submit" value="done" disabled={props.answered} />
    </form>;
}
