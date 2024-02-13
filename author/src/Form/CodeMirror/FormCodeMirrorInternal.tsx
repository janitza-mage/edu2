import {Controller, useFormContext} from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import {InputLabel} from "@mui/material";
import {ReactCodeMirrorProps} from "@uiw/react-codemirror/src";

export interface FormCodeMirrorBaseProps {
    name: string;
    label: string;
}

export interface FormCodeMirrorInternalProps extends FormCodeMirrorBaseProps {
    extraCodeMirrorProps: Partial<ReactCodeMirrorProps>,
}

export function FormCodeMirrorInternal(props: FormCodeMirrorInternalProps) {
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
                    {...props.extraCodeMirrorProps}
                />
            )}
        />
    </div>;
}
