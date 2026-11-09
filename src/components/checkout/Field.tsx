"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { useFormContext, type FieldPath } from "react-hook-form";
import type { CheckoutFormInput } from "@/lib/validation/checkout.schema";
import { cn } from "@/lib/utils/cn";

type FieldName = FieldPath<CheckoutFormInput>;

interface FieldProps {
  name: FieldName;
  label: string;
  hint?: string;
  optional?: boolean;
  className?: string;
}

/*
 * Floating label (outlined style): the label rests inside the field and moves up
 * onto the border on focus or once there is a value. Uses `:placeholder-shown`,
 * so every control needs a placeholder; real placeholders only show on focus.
 */
const controlBase =
  "peer block w-full rounded-2xl border-[1.5px] bg-white px-4 text-base text-cacao transition-colors focus:border-cacao focus:outline-none placeholder:text-transparent focus:placeholder:text-cacao-faint/70";

const labelBase =
  "pointer-events-none absolute left-3 z-10 max-w-[calc(100%-1.5rem)] origin-left truncate rounded-sm bg-white px-1 text-base text-cacao-faint transition-all duration-150 ease-out " +
  "peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-cacao " +
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium";

function useFieldError(name: FieldName) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>();
  return { register, error: errors[name]?.message as string | undefined };
}

function FieldShell({
  id,
  label,
  hint,
  optional,
  error,
  className,
  labelClassName,
  children,
}: Omit<FieldProps, "name"> & { id: string; error?: string; labelClassName: string; children: ReactNode }) {
  return (
    <div className={className}>
      <div className="relative">
        {children}
        <label htmlFor={id} className={cn(labelBase, labelClassName, error && "text-danger peer-focus:text-danger")}>
          {label}
          {optional && <span className="font-normal"> (opcional)</span>}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 px-1 text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 px-1 text-sm text-cacao-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  name,
  label,
  hint,
  optional,
  className,
  placeholder,
  ...inputProps
}: FieldProps & Omit<ComponentProps<"input">, "name">) {
  const id = useId();
  const { register, error } = useFieldError(name);
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      optional={optional}
      error={error}
      className={className}
      labelClassName="top-1/2 -translate-y-1/2"
    >
      <input
        id={id}
        {...register(name)}
        {...inputProps}
        placeholder={placeholder ?? " "}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlBase, "h-13", error ? "border-danger" : "border-cacao/20 hover:border-cacao/45")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  optional,
  className,
  placeholder,
  ...props
}: FieldProps & Omit<ComponentProps<"textarea">, "name">) {
  const id = useId();
  const { register, error } = useFieldError(name);
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      optional={optional}
      error={error}
      className={className}
      labelClassName="top-[1.6rem] -translate-y-1/2"
    >
      <textarea
        id={id}
        rows={3}
        {...register(name)}
        {...props}
        placeholder={placeholder ?? " "}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(
          controlBase,
          "resize-y py-3.5",
          error ? "border-danger" : "border-cacao/20 hover:border-cacao/45",
        )}
      />
    </FieldShell>
  );
}
