import { useEffect, useState } from "react";
import { config } from "../../config/config";

export interface Study {
  id: string;
  title: string;
  protocol: string;
  status: string;
  created_at: string;
}

export function useStudentStudies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const userId = localStorage.getItem("userId") || "1" //REMOVE AFTER FULL INTEGRATION;

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
        setStudies(data.studies);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { studies, loading, error };
}
