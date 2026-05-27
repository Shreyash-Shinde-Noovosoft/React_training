import { Control, Controller, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./field";

type BaseControllerProps< T extends FieldValues, > = {
    name: Path<T>

    label?: string

    control?: Control<T>

    rules?: RegisterOptions<T>

    children: (params: {
        field: any
        fieldState: any
    }) => React.ReactNode
}

export function BaseController< T extends FieldValues,>({
    name,
    label,
    control,
    rules,
    children,
}: BaseControllerProps<T>) {
    const methods = useFormContext<T>()

    const finalControl = control ?? methods.control

    return (
        <Controller
        name = {name}
        control={finalControl}
        rules={rules}

        render = {({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
                {
                    label && (
                        <FieldLabel>
                            {label}
                        </FieldLabel>
                    )
                }

                {children({
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