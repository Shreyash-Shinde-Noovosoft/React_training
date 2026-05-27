"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder: string;

  value?: string;

  options: string[];

  onChange: (value: string | undefined) => void;
};

export default function TaskFilterSelect({
  placeholder,
  value,
  options,
  onChange,
}: Props) {
  return (
    <Select
      value={value ?? "all"}
      onValueChange={(value) => {
        onChange(
          value === "all"
            ? undefined
            : value
        );
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={placeholder}
        />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          All {placeholder}
        </SelectItem>

        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}