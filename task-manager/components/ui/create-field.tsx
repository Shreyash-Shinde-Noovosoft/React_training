'use client'

import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

import { BaseController } from './base-controller'

export type BaseFieldProps<
  T extends FieldValues,
> = {
  name: Path<T>

  label?: string

  control?: Control<T>

  rules?: RegisterOptions<T>
}

export function createField<
  ComponentProps,
>(
  renderField: (
    field: any,
    props: ComponentProps,
  ) => React.ReactNode,
) {

  return function GeneratedField<
    T extends FieldValues,
  >({
    name,
    label,
    control,
    rules,
    ...props
  }: BaseFieldProps<T> & ComponentProps) {

    return (
      <BaseController
        name={name}
        label={label}
        control={control}
        rules={rules}
        render={({ field }) =>
          renderField(
            field,
            props as ComponentProps,
          )
        }
      />
    )
  }
}




// *********


export function createNativeField<
  ComponentProps,
>(
  Component: React.ComponentType<any>,
) {

  return createField<ComponentProps>(
    (field, props) => (
      <Component
        {...field}
        {...props}
        value={field.value ?? ''}
      />
    )
  )
}



export function createCheckedField<
  ComponentProps,
>(
  Component: React.ComponentType<any>,
) {

  return createField<ComponentProps>(
    (field, props) => (
      <Component
        {...props}
        checked={!!field.value}
        onCheckedChange={
          field.onChange
        }
      />
    )
  )
}