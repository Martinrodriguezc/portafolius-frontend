import { useEffect, useState } from "react";
import { config } from "../../config/config";
import { authService } from "../auth/authServices";

export interface Study {
  id: string;
  title: string;
  protocol: string;
  status: string; // "EVALUADO" o "PENDIENTE"
  created_at: string;
  score: number | null;
}

export function useStudentStudies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const userId = authService.getCurrentUser()?.id;

  if (!userId) {
    throw new Error("No hay userId en localStorage. Debes iniciar sesión.");
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/study/${userId}`);
        if (!resp.ok)
          throw new Error(`Error ${resp.status} al obtener estudios`);
        const data = await resp.json();

        const transformed = data.studies.map((s: any) => ({
          id: s.id,
          title: s.title,
          protocol: s.protocol,
          created_at: s.created_at,
          status: s.has_evaluation ? "EVALUADO" : "PENDIENTE",
          score: s.score ?? null,
        }));

        setStudies(transformed);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { studies, loading, error };
}
