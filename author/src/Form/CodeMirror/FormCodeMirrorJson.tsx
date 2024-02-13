import React from "react";
import {json, jsonParseLinter} from "@codemirror/lang-json";
import {FormCodeMirrorBaseProps, FormCodeMirrorInternal} from "./FormCodeMirrorInternal";
import { linter, lintGutter } from "@codemirror/lint"

export interface FormCodeMirrorJsonProps extends FormCodeMirrorBaseProps {
}

export function FormCodeMirrorJson(props: FormCodeMirrorJsonProps) {
    return <FormCodeMirrorInternal
        {...props}
        extraCodeMirrorProps={{
            extensions: [
                json(),
                lintGutter(),
                linter(jsonParseLinter()),
            ],
        }}
    />;
}
