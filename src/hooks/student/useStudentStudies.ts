import { useEffect, useState } from "react";
import { config } from "../../config/config";

export interface Study {
  id: string;
  title: string;
  protocol: string;
  status: string;
  created_at: string;
}

export function useStudentStudies(userId?: string) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const id = "1";
    if (!id) {
      setError("No se encontró userId. Por favor inicia sesión.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/study/${id}`);
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
