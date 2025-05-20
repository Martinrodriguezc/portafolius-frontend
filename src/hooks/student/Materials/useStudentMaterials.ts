import { useQuery } from "@tanstack/react-query";
import { fetchStudentMaterials } from "./request/materialsRequest";
import type { StudentMaterial } from "../../../types/studentMaterial";

export function useStudentMaterials(studentId: number) {
  return useQuery<StudentMaterial[], Error>({
    queryKey: ["materials", studentId],
    queryFn: () => fetchStudentMaterials(studentId),
    staleTime: 5 * 60 * 1000,
  });
}