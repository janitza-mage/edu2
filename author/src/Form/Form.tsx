import React, {ReactElement, ReactNode} from "react";
import {DefaultValues, FieldValues, FormProvider, useForm} from "react-hook-form";
import {ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitButton} from "./SubmitButton";
import {extraFormContext} from "./ExtraFormContext";
import {background} from "../common/util/background";
import {UseFormReturn} from "react-hook-form/dist/types";

/*
New set of form components based on react-hook-form, intended to replace the old ones and then get renamed.

Note: zod transforms that change the output type are not yet supported due to a limitation in react-hook-form,
see https://github.com/react-hook-form/react-hook-form/issues/9600
 */

export interface FormProps<T extends FieldValues> {
  children: ReactNode;
  schema: ZodType<T>;
  onSubmit: (data: T, methods: UseFormReturn<T, any, T>) => void | Promise<void>;
  addSubmitButton?: boolean | string;
  defaultValues?: undefined | null | DefaultValues<T> | (() => Promise<T>);
  resetOnSuccess?: boolean;
}

export function Form<T extends FieldValues>({
  children,
  schema,
  onSubmit,
  addSubmitButton,
  defaultValues,
  resetOnSuccess,
}: FormProps<T>): ReactElement {
  const methods = useForm<T>({
    defaultValues: defaultValues ?? undefined,
    resolver: zodResolver(schema),
  });

  const submitButtonLabel = typeof addSubmitButton === "string" ? addSubmitButton : "Submit";

  async function internalOnSubmitAsync(data: T, _event?: React.BaseSyntheticEvent): Promise<void> {
    await onSubmit(data, methods);
    if (resetOnSuccess) {
      methods.reset();
    }
  }
  const internalOnSubmitAsyncWrapped = methods.handleSubmit(internalOnSubmitAsync);
  function internalOnSubmit(event: React.BaseSyntheticEvent): boolean {
    event.preventDefault();
    background(internalOnSubmitAsyncWrapped);
    return false;
  }

  return (
    <form noValidate onSubmit={internalOnSubmit}>
      <extraFormContext.Provider value={{ hasDefaultValueLoader: typeof defaultValues === "function" }}>
        <FormProvider {...methods}>
          {children}
          {(addSubmitButton ?? true) && (
            <div style={{ float: "right" }}>
              <SubmitButton>{submitButtonLabel}</SubmitButton>
            </div>
          )}
        </FormProvider>
      </extraFormContext.Provider>
    </form>
  );
}
