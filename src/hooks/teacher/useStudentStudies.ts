import { useEffect, useState } from "react";
import { config } from "../../config/config";

export interface Study {
  id: number;
  title: string;
  protocol: string | null;
  status: string;
}

export function useStudentStudies(studentId: number) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNaN(studentId)) {
      setStudies([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/study/${studentId}`);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const { studies } = await resp.json();
        setStudies(studies);
      } catch (err: any) {
        setError(err.message || "Error cargando estudios");
      } finally {
        setLoading(false);
      }
    })();
  }, [studentId]);

  return { studies, loading, error };
}