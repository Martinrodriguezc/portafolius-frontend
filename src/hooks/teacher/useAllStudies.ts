import { useEffect, useState } from "react";
import { config } from "../../config/config";

interface StudyWithStatus {
  study_id: number;
  title: string;
  protocol: string;
  status: string;
  created_at: string;
  has_evaluation: boolean;
  first_name: string;
  last_name: string;
  email: string;
  score: number;
}

export function useAllStudies() {
  const [studies, setStudies] = useState<StudyWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${config.SERVER_URL}/study/teacher/study-with-status`);
        if (!res.ok) throw new Error(`Error ${res.status} al obtener estudios`);
        const data = await res.json();
        setStudies(data.studies);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pending = studies.filter((s) => !s.has_evaluation);
  const completed = studies.filter((s) => s.has_evaluation);

  return { pending, completed, loading, error };
}