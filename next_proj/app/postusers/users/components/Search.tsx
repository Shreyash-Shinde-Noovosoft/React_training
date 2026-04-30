import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
SetStateAction,
Dispatch } from "react";

export function Search( props: {input: string, setInput: Dispatch<SetStateAction<string>>} ) {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setInput(event.target.value);
  };
  return (
    <Field orientation="horizontal">
      <Input value={props.input} type="search" placeholder="Search..." onChange={handleSearch} />
    </Field>
  )
}
