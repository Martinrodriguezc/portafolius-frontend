export type FieldType = "text" | "number" | "email";

export interface FieldDescriptor {
  label: string;
  name: string;
  type: FieldType;
}