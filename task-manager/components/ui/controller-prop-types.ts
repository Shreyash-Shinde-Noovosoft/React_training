import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control?: Control<T>;
  rules?: RegisterOptions<T>;
};

export type Option = {
  label: string;
  value: string;
};