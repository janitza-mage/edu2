import {Controller, useFormContext} from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import {FormHelperText, InputLabel} from "@mui/material";
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
    const errors = form.formState.errors;
    const error: string | null = errors[props.name] ? ("" + errors[props.name]?.message) : null;
    return <div>
        <InputLabel>{props.label}</InputLabel>
        {error && <FormHelperText error>{error}</FormHelperText>}
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
