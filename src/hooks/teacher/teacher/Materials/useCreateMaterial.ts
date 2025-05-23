import { useState, useEffect, FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchStudentsRequest, createMaterialRequest } from "./request/materialRequest";
import { UserProps } from "../../../../types/User";
import { CreateMaterialPayload } from "../../../../types/material";

export function useCreateMaterial() {
  const qc = useQueryClient();

  const [students, setStudents] = useState<UserProps[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [material, setMaterial] = useState<CreateMaterialPayload>({
    type: "document",
    title: "",
    description: "",
    url: "",
    studentIds: [],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [creating, setCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    void fetchStudentsRequest()
      .then(({ data }) => {
        setStudents(data.filter((u) => u.role === "estudiante"));
      })
      .catch((err) => setStudentsError(err.message))
      .finally(() => setLoadingStudents(false));
  }, []);

  const handleChange = <K extends keyof CreateMaterialPayload>(
    field: K,
    value: CreateMaterialPayload[K]
  ) => {
    setMaterial((m) => ({ ...m, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile || material.studentIds.length === 0) {
      setCreateError("Debes completar todos los campos y seleccionar un archivo");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      fd.append("type", material.type);
      fd.append("title", material.title);
      fd.append("description", material.description);
      fd.append("studentIds", JSON.stringify(material.studentIds));

      await createMaterialRequest(fd);

      setSuccess(true);
      qc.invalidateQueries({ queryKey: ["materialStats"] });
      qc.invalidateQueries({ queryKey: ["materials"] });

      setMaterial({ type: "document", title: "", description: "", url: "", studentIds: [] });
      setSelectedFile(null);
    } catch (err: any) {
      setCreateError(err.message || "Error creando material");
    } finally {
      setCreating(false);
    }
  };

  return {
    students,
    loadingStudents,
    studentsError,

    material,
    selectedFile,
    setSelectedFile,

    creating,
    createError,
    success,

    handleChange,
    handleSubmit,
  };
}