import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Material } from "../../types/material";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useStudentMaterials = (studentId: number) =>
  useQuery<Material[]>({
    queryKey: ["materials", studentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/materials/student/${studentId}/`
      );
      return data;
    },
  });