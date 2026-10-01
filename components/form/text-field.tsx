"use client";

import { useId, type ComponentProps } from "react";
import { useSelector } from "@tanstack/react-form";
import { useFieldContext } from "@/hooks/form-context";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type TextFieldProps = Pick<
  ComponentProps<typeof Input>,
  | "id"
  | "type"
  | "autoComplete"
  | "required"
  | "minLength"
  | "placeholder"
  | "disabled"
> & {
  label: string;
  description?: string;
};

export function TextField({
  id,
  label,
  description,
  ...inputProps
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const value = useSelector(field.store, (state) => state.value);
  const meta = useSelector(field.store, (state) => state.meta);
  const invalid = meta.isTouched && !meta.isValid;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  // Field context is shared across validators, which may return strings or issues.
  const errors = meta.errors.map((error: unknown) => {
    if (typeof error === "string") return { message: error };
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return { message: error.message };
    }
    return undefined;
  });

  return (
    <Field
      data-invalid={invalid}
      data-disabled={inputProps.disabled}
      className="gap-2"
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Input
        {...inputProps}
        id={inputId}
        name={field.name}
        value={value}
        onChange={(event) => field.handleChange(event.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={invalid}
        aria-describedby={
          [
            description && !invalid ? descriptionId : undefined,
            invalid ? errorId : undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />
      {description && !invalid && (
        <FieldDescription id={descriptionId} className="text-xs">
          {description}
        </FieldDescription>
      )}
      {invalid && (
        <FieldError id={errorId} errors={errors} className="text-xs" />
      )}
    </Field>
  );
}
