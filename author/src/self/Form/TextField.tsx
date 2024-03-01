import { TextFieldElement, TextFieldElementProps } from "react-hook-form-mui";
import React, { ReactElement } from "react";

export interface TextFieldProps {
  name: string;
  label: string;
  muiTextFieldProps?: Partial<TextFieldElementProps>;
}

export function TextField({ name, label, muiTextFieldProps }: TextFieldProps): ReactElement {
  return <TextFieldElement name={name} label={label} fullWidth margin="dense" variant="standard" {...muiTextFieldProps} />;
}
