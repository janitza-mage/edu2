import { FieldError, SelectElement } from "react-hook-form-mui";
import { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField/TextField";
import { ReactElement } from "react";

export interface SelectProps {
  name: string;
  label: string;
  options: { id: string | number; label: string | number }[];
  reactHookFormMuiSelectProps?: Omit<MuiTextFieldProps, "name" | "type" | "onChange"> & {
    options?: { id: string | number; label: string | number }[];
    valueKey?: string;
    labelKey?: string;
    type?: "string" | "number";
    parseError?: (error: FieldError) => string;
    objectOnChange?: boolean;
    onChange?: (value: unknown) => void;
  };
}

export function Select({ name, label, options, reactHookFormMuiSelectProps }: SelectProps): ReactElement {
  return (
    <div>
      <SelectElement
        name={name}
        label={label}
        options={options}
        fullWidth
        sx={{ marginBottom: "5px" }}
        {...reactHookFormMuiSelectProps}
      />
    </div>
  );
}
