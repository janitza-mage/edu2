import React from "react";
import {markdown, markdownLanguage} from "@codemirror/lang-markdown";
import {languages} from "@codemirror/language-data";
import {FormCodeMirrorBaseProps, FormCodeMirrorInternal} from "./FormCodeMirrorInternal";

export interface FormCodeMirrorMarkdownProps extends FormCodeMirrorBaseProps {
}

export function FormCodeMirrorMarkdown(props: FormCodeMirrorMarkdownProps) {
    return <FormCodeMirrorInternal
        {...props}
        extraCodeMirrorProps={{
            extensions: [
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                }),
            ],
        }}
    />;
}
