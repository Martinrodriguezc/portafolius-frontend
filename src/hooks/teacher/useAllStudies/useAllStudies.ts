import { useEffect, useState } from "react";
import { StudyWithStatus } from "../../../types/Study";
import { fetchAllStudiesRequest } from "./request/studiesRequest";

export function useAllStudies() {
  const [studies, setStudies] = useState<StudyWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const allStudies = await fetchAllStudiesRequest();
        setStudies(allStudies);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    void loadStudies();
  }, []);

  const pending = studies.filter((s) => !s.has_evaluation);
  const completed = studies.filter((s) => s.has_evaluation);

  return { pending, completed, loading, error };
}
