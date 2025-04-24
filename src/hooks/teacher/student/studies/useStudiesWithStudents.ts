import { useState, useEffect } from "react";
import { config } from "../../../../config/config";
import { StudyWithStudent } from "../../../../types/Study";



export function useStudiesWithStudent() {
  const [data, setData] = useState<StudyWithStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const resp = await fetch(
          `${config.SERVER_URL}/teacher/study-with-student`
        );
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const json = await resp.json();
        setData(json.studies as StudyWithStudent[]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return { studiesWithStudent: data, loading, error };
}
