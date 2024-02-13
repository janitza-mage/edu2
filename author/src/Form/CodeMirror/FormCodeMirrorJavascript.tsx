import React from "react";
import {javascript} from "@codemirror/lang-javascript";
import {FormCodeMirrorBaseProps, FormCodeMirrorInternal} from "./FormCodeMirrorInternal";
import {lintGutter} from "@codemirror/lint"

export interface FormCodeMirrorJavascriptProps extends FormCodeMirrorBaseProps {
}

export function FormCodeMirrorJavascript(props: FormCodeMirrorJavascriptProps) {
    return <FormCodeMirrorInternal
        {...props}
        extraCodeMirrorProps={{
            extensions: [
                javascript(),
                lintGutter(),
                // no linting for now -- docs on that are horrible
            ],
        }}
    />;
}
