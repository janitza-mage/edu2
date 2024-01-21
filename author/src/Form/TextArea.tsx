import React, {ReactElement} from "react";
import {useFormContext} from "react-hook-form";

export interface TextFieldProps {
  name: string;
  label: string;
}

export function TextArea({ name, label }: TextFieldProps): ReactElement {
  const {register} = useFormContext();
  return <div>
    <div>{label}</div>
    <textarea name={name} {...register} />
  </div>;
}
