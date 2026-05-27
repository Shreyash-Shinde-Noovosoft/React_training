'use client'

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { BaseFieldProps } from "./controller-prop-types";
import { Field, FieldError, FieldLabel } from "./field";
import { Textarea } from "./textarea";
import { BaseController } from "./base-controller";


type FormTextareaProps<T extends FieldValues> =
  BaseFieldProps<T> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  ...props
}: FormTextareaProps<T>) {
  const methods = useFormContext<T>();

  const finalControl = control ?? methods.control;

//   return (
//     <Controller
//       name={name}
//       control={finalControl}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           {label && (
//             <FieldLabel>
//               {label}
//             </FieldLabel>
//           )}

//           <Textarea
//             {...field}
//             {...props}
//           />

//           {fieldState.error && (
//             <FieldError
//               errors={[fieldState.error]}
//             />
//           )}
//         </Field>
//       )}
//     />
//   );

return (
    <BaseController
      name={name}
      label={label}
      control={control}
      rules={rules}
    >
      {({ field }) => (
        <Textarea
          {...field}
          {...props}
          value={field.value ?? ''}
        />
      )}
    </BaseController>
  )
}