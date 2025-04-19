import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sampleStudentsData, Student } from "../../pages/Teacher/utils/utils";

export function useStudentForm(mode: "view" | "create") {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const studentId = id ? Number(id) : undefined;
  const existingStudent =
    mode === "view"
      ? sampleStudentsData.find((s) => s.id === studentId)
      : undefined;

  // Estado inicial siempre definido en top‑level
  const initialState: Student = {
    id: mode === "create" ? Date.now() : existingStudent!.id,
    name: mode === "create" ? "" : existingStudent!.name,
    email: mode === "create" ? "" : existingStudent!.email,
    institution: mode === "create" ? "" : existingStudent!.institution,
    specialty: mode === "create" ? "" : existingStudent!.specialty,
    year: mode === "create" ? "" : existingStudent!.year,
    studies: mode === "create" ? 0 : existingStudent!.studies,
    averageScore: mode === "create" ? 0 : existingStudent!.averageScore,
    lastActivity: mode === "create" ? "" : existingStudent!.lastActivity,
    status: mode === "create" ? "active" : existingStudent!.status,
  };

  const [formState, setFormState] = useState<Student>(initialState);
  const notFound = mode === "view" && !existingStudent;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]:
        name === "studies" || name === "averageScore"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (mode === "create") {
      sampleStudentsData.push(formState);
    }
    navigate("/teacher/students");
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    navigate,
    notFound,
    existingStudent,
  };
}