import { useEffect, useState } from "react";
import { fetchStudentStudies } from "./studies/request/studentStudiesRequest";
import { Study } from "../../../types/Study";

export function useFetchStudentStudies(studentId: number) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isNaN(studentId)) {
      setStudies([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const allStudies = await fetchStudentStudies(studentId);
        setStudies(allStudies);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error cargando estudios");
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [studentId]);

  return { studies, loading, error };
}