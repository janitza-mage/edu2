import { Button } from "@mui/material";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { useFormState } from "react-hook-form";
import { useExtraFormContext } from "./ExtraFormContext";

type MuiButtonProps = Parameters<typeof Button>[0];

export interface SubmitButtonProps {
  children: ReactNode;
  muiButtonProps?: MuiButtonProps;
}

export function SubmitButton({ children, muiButtonProps }: SubmitButtonProps): ReactElement {
  const extraFormContext = useExtraFormContext();
  const formState = useFormState({});
  const isLoadingDefaultValues = extraFormContext.hasDefaultValueLoader && formState.isLoading;
  const disabled = isLoadingDefaultValues || formState.isValidating || formState.isSubmitting;
  return (
    <Button disabled={disabled} type="submit" variant="contained" {...muiButtonProps}>
      {children}
    </Button>
  );
}
