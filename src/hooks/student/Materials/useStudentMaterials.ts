import { useQuery } from "@tanstack/react-query";
import { Material } from "../../../types/material";
import { fetchStudentMaterials } from "./request/materialsRequest";

export const useStudentMaterials = (studentId: number) => {
  return useQuery<Material[]>({
    queryKey: ["materials", studentId],
    queryFn: () => fetchStudentMaterials(studentId),
    staleTime: 5 * 60 * 1000,
  });
};
