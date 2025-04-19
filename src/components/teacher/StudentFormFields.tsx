import React from "react";
import Input from "../common/Input/BaseInput";
import { Student } from "../../pages/Teacher/utils/utils";

type FieldKey =
  | "name"
  | "email"
  | "institution"
  | "specialty"
  | "year"
  | "studies"
  | "averageScore"
  | "lastActivity"
  | "status";

interface Props {
  formState: Student;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
}

export default function StudentFormFields({
  formState,
  handleChange,
  readOnly,
}: Props) {
  const fields: Array<{ label: string; name: FieldKey; type: string }> = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Institución", name: "institution", type: "text" },
    { label: "Especialidad", name: "specialty", type: "text" },
    { label: "Año", name: "year", type: "text" },
    { label: "Estudios", name: "studies", type: "number" },
    { label: "Promedio", name: "averageScore", type: "number" },
    { label: "Última actividad", name: "lastActivity", type: "text" },
    { label: "Estado", name: "status", type: "text" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(({ label, name, type }) => (
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
  );
}