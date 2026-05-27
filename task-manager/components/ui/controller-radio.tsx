'use client'

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./field";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { BaseFieldProps, Option } from "./controller-prop-types";
import { BaseController } from "./base-controller";


type FormRadioGroupProps<T extends FieldValues> =
  BaseFieldProps<T> & {
    options: Option[];
  };

export function FormRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
  control,
  rules,
}: FormRadioGroupProps<T>) {
  const methods = useFormContext<T>();

  const finalControl = control ?? methods.control;

  return (
    <BaseController
      name={name}
      control={control}
      rules={rules}
    >
      {({ field }) => (
        <div className="space-y-3">

          {label && (
            <FieldLabel>
              {label}
            </FieldLabel>
          )}

          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-2"
          >

            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2"
              >

                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                />

                <label
                  htmlFor={option.value}
                  className="text-sm"
                >
                  {option.label}
                </label>

              </div>
            ))}

          </RadioGroup>

        </div>
      )}
    </BaseController>
  )
}