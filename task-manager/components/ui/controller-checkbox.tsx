'use client'

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { BaseFieldProps } from "./controller-prop-types";
import { Field, FieldError, FieldLabel } from "./field";
import { Checkbox } from "./checkbox";
import { BaseController } from "./base-controller";

type FormCheckboxProps<T extends FieldValues> =
  BaseFieldProps<T>;

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  control,
  rules,
}: FormCheckboxProps<T>) {
  const methods = useFormContext<T>();

  const finalControl = control ?? methods.control;

//   return (
//     <Controller
//       name={name}
//       control={finalControl}
//       rules={rules}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <div className="flex items-center gap-2">
//             <Checkbox
//               checked={field.value}
//               onCheckedChange={field.onChange}
//             />

//             {label && (
//               <FieldLabel>
//                 {label}
//               </FieldLabel>
//             )}
//           </div>

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
        <Checkbox
          checked={field.value ?? false}
          onCheckedChange={field.onChange}
        />
      )}
    </BaseController>
  )
}