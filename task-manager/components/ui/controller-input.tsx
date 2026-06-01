// 'use client'

// import { Control, Controller, FieldValues, Path, useFormContext } from "react-hook-form";
// import { Field, FieldError, FieldLabel } from "./field";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
// import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "./input-group";
// import { Input } from "./input";
// import { BaseFieldProps } from "./controller-prop-types";
// import { BaseController } from "./base-controller";
// import { ru } from "zod/v4/locales";





// type FormInputProps<T extends FieldValues> =
//   BaseFieldProps<T> &
//   React.InputHTMLAttributes<HTMLInputElement>;

// export function FormInput<T extends FieldValues>({
//   name,
//   label,
//   control,
//   rules,
//   ...props
// }: FormInputProps<T>) {
// //   const methods = useFormContext<T>();

// //   const finalControl = control ?? methods.control;

// //   return (
// //     <Controller
// //       name={name}
// //       control={finalControl}
// //       rules={rules}
// //       render={({ field, fieldState }) => (
// //         <Field data-invalid={fieldState.invalid}>
// //           {label && (
// //             <FieldLabel>
// //               {label}
// //             </FieldLabel>
// //           )}

// //           <Input
// //             {...field}
// //             {...props}
// //           />

// //           {fieldState.error && (
// //             <FieldError
// //               errors={[fieldState.error]}
// //             />
// //           )}
// //         </Field>
// //       )}
// //     />
// //   );


// return (
//     <BaseController
//     name={name}
//     label={label}
//     control={control}
//     rules={rules}

//     >
//         {({field}) => (
//             <Input
//             {...field}
//             {...props}
//             value={field.value ?? ''}
//             />
//         )}
//     </BaseController>
// )
// }



import { Input } from './input'

import { createField } from './create-field'

export const FormInput =
  createField<
    React.InputHTMLAttributes<HTMLInputElement>
  >(
    (field, props) => (
      <Input
        {...field}
        {...props}
        value={field.value ?? ''}
      />
    )
  )