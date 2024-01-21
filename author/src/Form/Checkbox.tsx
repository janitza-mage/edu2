import { CheckboxProps as MuiCheckboxProps, FormControlLabelProps } from "@mui/material";
import { CheckboxElement } from "react-hook-form-mui";
import React, { ReactElement } from "react";

export interface CheckboxProps {
  name: string;
  label: string;
  labelProps?: Omit<FormControlLabelProps, "label" | "control">;
  muiCheckboxProps?: Omit<MuiCheckboxProps, "name" | "ref">; // ref is wrongly typed, probably a bug in RHF
  inline?: boolean;
}

export function Checkbox({ name, label, labelProps, muiCheckboxProps, inline }: CheckboxProps): ReactElement {
  const element = <CheckboxElement name={name} label={label} labelProps={labelProps} {...muiCheckboxProps} />;
  return inline ? element : <div>{element}</div>;
}
