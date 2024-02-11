import {Controller, useFormContext} from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import {InputLabel} from "@mui/material";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export interface FormCodeMirrorProps {
    name: string;
    label: string;
}

export function FormCodeMirror(props: FormCodeMirrorProps) {
    const form = useFormContext();
    return <div>
        <InputLabel>{props.label}</InputLabel>
        <Controller
            name={props.name}
            control={form.control}
            defaultValue=""
            render={({ field }) => (
                <CodeMirror
                    {...field}
                    onChange={(value: string) => {
                        field.onChange(value);
                    }}
                    extensions={[
                        markdown({
                            base: markdownLanguage,
                            codeLanguages: languages,
                        }),
                    ]}
                    height="200px"
                />
            )}
        />
    </div>;
}
