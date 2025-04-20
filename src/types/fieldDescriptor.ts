import type { Student } from "./teacherData"

export interface FieldDescriptor {
  label: string
  name: keyof Student
  type: "text" | "number"
}