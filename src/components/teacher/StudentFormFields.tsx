import React from "react"
import Input from "../common/Input/Input"
import type { Student } from "../../types/teacherData"
import type { FieldDescriptor } from "../../types/fieldDescriptor"
import { studentFormFields } from "../../utils/studentFormFields"

interface Props {
  formState: Student
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly: boolean
}

export default function StudentFormFields({
  formState,
  handleChange,
  readOnly,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {studentFormFields.map(({ label, name, type }: FieldDescriptor) => (
        <div key={name}>
          <label className="block text-[14px] mb-1">{label}</label>
          <Input
            name={name}
            type={type}
            value={String(formState[name])}
            onChange={handleChange}
            readOnly={readOnly}
          />
        </div>
      ))}
    </div>
  )
}
