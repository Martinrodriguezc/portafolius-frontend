import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sampleStudentsData, Student } from "../../pages/Teacher/utils/utils";

export function useStudentForm(mode: "view" | "create") {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const studentId = id ? Number(id) : undefined;
  const existing =
    mode === "view"
      ? sampleStudentsData.find((s) => s.id === studentId)
      : undefined;

  if (mode === "view" && !existing) {
    return { formState: null, handleChange: () => {}, handleSubmit: () => {}, navigate, existing: null };
  }

  const [formState, setFormState] = useState<Student>({
    id: mode === "create" ? Date.now() : existing!.id,
    name: existing?.name || "",
    email: existing?.email || "",
    institution: existing?.institution || "",
    specialty: existing?.specialty || "",
    year: existing?.year || "",
    studies: existing?.studies || 0,
    averageScore: existing?.averageScore || 0,
    lastActivity: existing?.lastActivity || "",
    status: existing?.status || "active",
  });

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

  return { formState, handleChange, handleSubmit, navigate, existing };
}