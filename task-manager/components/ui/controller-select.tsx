// 'use client'

// import { Controller, FieldValues, useFormContext } from "react-hook-form";
// import { BaseFieldProps, Option } from "./controller-prop-types";
// import { Field, FieldError, FieldLabel } from "./field";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
// import { BaseController } from "./base-controller";


// type FormSelectProps<T extends FieldValues> =
//   BaseFieldProps<T> & {
//     placeholder?: string;
//     options: Option[];
//   };
  
// export function FormSelect<T extends FieldValues>({
//   name,
//   label,
//   placeholder,
//   options,
//   control,
//   rules,
// }: FormSelectProps<T>) {
//   const methods = useFormContext<T>();

//   const finalControl = control ?? methods.control;

//     return (
//     <BaseController
//       name={name}
//       label={label}
//       control={control}
//       rules={rules}
//     >
//       {({ field }) => (
//         <Select
//           value={field.value ?? ''}
//           onValueChange={field.onChange}
//         >
//           <SelectTrigger>
//             <SelectValue
//               placeholder={placeholder}
//             />
//           </SelectTrigger>

//           <SelectContent>
//             {options.map((option) => (
//               <SelectItem
//                 key={option.value}
//                 value={option.value}
//               >
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       )}
//     </BaseController>
//   )
// }

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

import { createField } from './create-field'

type Option = {
  label: string
  value: string
}

type SelectProps = {
  placeholder?: string
  options: Option[]
}

export const FormSelect =
  createField<SelectProps>(
    (
      field,
      {
        placeholder,
        options,
      },
    ) => (

      <Select
        value={field.value}
        onValueChange={
          field.onChange
        }
      >
        <SelectTrigger>
          <SelectValue
            placeholder={placeholder}
          />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>

      </Select>
    )
  )