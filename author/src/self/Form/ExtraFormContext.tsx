import React, { useContext } from "react";

/*
This context is being used in addition to react-hook-form's form context because RHF reports the default values to be
always-loading if they don't use an async loader at all. So we use this custom context to tell the sub-components
that no async loader is used to allow them to correctly interpret this "always-loading" state.
 */

export interface ExtraFormContextType {
  hasDefaultValueLoader: boolean;
}

export const extraFormContext = React.createContext<ExtraFormContextType | null>(null);

export function useExtraFormContext(): ExtraFormContextType {
  const result = useContext(extraFormContext);
  if (!result) {
    throw new Error("useExtraFormContextType() is being used outside a <Form>");
  }
  return result;
}
