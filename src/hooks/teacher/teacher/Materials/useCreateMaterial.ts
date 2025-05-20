import { useState, useEffect, FormEvent } from "react";
import { fetchStudentsRequest, createMaterialRequest } from "./request/materialRequest";
import { UserProps } from "../../../../types/User";
import { CreateMaterialPayload } from "../../../../types/material";

export function useCreateMaterial() {
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

  const [creating, setCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [createdCount, setCreatedCount] = useState<number>(0);
  const [assignedStudents, setAssignedStudents] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadStudents = async () => {
      setLoadingStudents(true);
      try {
        const { data } = await fetchStudentsRequest();
        const onlyStudents = data.filter((u) => u.role === "estudiante");
        setStudents(onlyStudents);
      } catch (err: unknown) {
        if (err instanceof Error) setStudentsError(err.message);
        else setStudentsError("Error al cargar estudiantes");
      } finally {
        setLoadingStudents(false);
      }
    };
    void loadStudents();
  }, []);

  const handleChange = <K extends keyof CreateMaterialPayload>(
    field: K,
    value: CreateMaterialPayload[K]
  ) => {
    setMaterial((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    setSuccess(false);

    try {
      await createMaterialRequest(material);
      setSuccess(true);

      setCreatedCount((c) => c + 1);
      setAssignedStudents((prev) => {
        const next = new Set(prev);
        material.studentIds.forEach((id) => next.add(id));
        return next;
      });

      setMaterial({
        type: "document",
        title: "",
        description: "",
        url: "",
        studentIds: [],
      });
    } catch (err: unknown) {
      if (err instanceof Error) setCreateError(err.message);
      else setCreateError("Error al crear material");
    } finally {
      setCreating(false);
    }
  };

  return {
    students,
    loadingStudents,
    studentsError,

    material,
    creating,
    createError,
    success,

    createdCount,
    assignedCount: assignedStudents.size,
    handleChange,
    handleSubmit,
  };
}