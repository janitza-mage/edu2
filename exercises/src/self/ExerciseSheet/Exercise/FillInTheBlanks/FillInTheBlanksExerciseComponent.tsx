import {ExerciseComponentProps} from "../ExerciseComponentProps";
import {FillInTheBlanksExercise} from "../../../../common/types/Exercise";
import {FormEvent, useEffect, useRef} from "react";
import {allocateSyntheticIds} from "../../../util/SyntheticId";
import $ from "jquery";
import {renderFormContents} from "./renderFormContents";
import {processFormSubmission} from "./processFormSubmission";
import styles from "./FillInTheBlanksExerciseComponent.module.css";
import {loseFocus} from "../../../util/loseFocus";

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
        const query = $("#" + stateRef.current.htmlId);
        if (!stateRef.current.initiallyRendered) {
            query.on("keydown", ":input:not(textarea):not(:submit)", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    loseFocus();
                }
            });
            query.html(renderFormContents(props));
            stateRef.current.initiallyRendered = true;
        } else {
            query.find("input[type=text],input[type=number],select").attr("disabled", props.answered ? "disabled" : null);
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
