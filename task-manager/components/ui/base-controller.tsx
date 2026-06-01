'use client'

import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'

import {
  Field,
  FieldError,
  FieldLabel,
} from './field'

type BaseControllerProps<
  T extends FieldValues,
> = {
  name: Path<T>

  label?: string

  control?: Control<T>

  rules?: RegisterOptions<T>

  render: (params: {
    field: any
    fieldState: any
  }) => React.ReactNode
}

export function BaseController<
  T extends FieldValues,
>({
  name,
  label,
  control,
  rules,
  render,
}: BaseControllerProps<T>) {

  const methods = useFormContext<T>()

  const finalControl =
    control ?? methods.control

  return (
    <Controller
      name={name}
      control={finalControl}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>

          {label && (
            <FieldLabel>
              {label}
            </FieldLabel>
          )}

          {render({
            field,
            fieldState,
          })}

          {fieldState.error && (
            <FieldError
              errors={[fieldState.error]}
            />
          )}

        </Field>
      )}
    />
  )
}

// const StrinField = <T extends FieldValues>({
//   name,
//   label,
//   control,
//   rules,
//   ...props
// }: FormInputProps<T>) => (
//   <BaseController name={name} label={label} control={control} rules={rules}>
//     {({ field }) => <Input {...field} {...props} value={field.value ?? ""} />}
//   </BaseController>
// );

// const NumberField = <T extends FieldValues>({
//   name,
//   label,
//   control,
//   rules,
//   ...props
// }: FormInputProps<T>) => (
//   <BaseController name={name} label={label} control={control} rules={rules}>
//     {({ field }) => (
//       <Input type="number" {...field} {...props} value={field.value ?? ""} />
//     )}
//   </BaseController>
// );


// const select  = <T extends FieldValues>({
//   name,
//   label,
//   placeholder,
//   options,
//   control,
//   rules,
// }: FormSelectProps<T>) => (
//      <BaseController
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
// )