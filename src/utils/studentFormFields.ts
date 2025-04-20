import type { Student } from "../types/teacherData";

export interface FieldDescriptor {
  label: string;
  name: keyof Student;
  type: "text" | "number";
}

export const studentFormFields: FieldDescriptor[] = [
  { label: "Nombre",           name: "name",         type: "text"   },
  { label: "Email",            name: "email",        type: "text"   },
  { label: "Institución",      name: "institution",  type: "text"   },
  { label: "Especialidad",     name: "specialty",    type: "text"   },
  { label: "Año",              name: "year",         type: "text"   },
  { label: "Estudios",         name: "studies",      type: "number" },
  { label: "Promedio",         name: "averageScore", type: "number" },
  { label: "Última actividad", name: "lastActivity", type: "text"   },
  { label: "Estado",           name: "status",       type: "text"   },
];