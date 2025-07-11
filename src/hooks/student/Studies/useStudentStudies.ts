import { useEffect, useState } from "react";
import { authService } from "../../auth/authServices";
import { fetchStudentStudies } from "./request/studiesRequest";
import { RawStudy, Study } from "../../../types/Study";

export function useStudentStudies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const user = authService.getCurrentUser();
  const userId = user?.id;
  if (!userId)
    throw new Error("No hay userId en localStorage. Debes iniciar sesión.");

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const rawStudies: RawStudy[] = await fetchStudentStudies(userId);
        const transformed: Study[] = rawStudies.map((s) => ({
          id: Number(s.id),
          title: s.title,
          description: s.description,
          created_at: s.created_at,
          status: s.has_evaluation ? "EVALUADO" : "PENDIENTE",
          has_evaluation: s.has_evaluation,
          score: s.score ?? null,
        }));
        setStudies(transformed);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    loadStudies();
  }, [userId]);

  return { studies, loading, error };
}