import { useEffect, useState } from "react";
import { config } from "../../config/config";

export interface TeacherStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export function useTeacherStudents(teacherId?: number) {
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string>("");

  useEffect(() => {
    if (!teacherId) return;
    (async () => {
      try {
        const resp = await fetch(`${config.SERVER_URL}/teacher/${teacherId}/students`);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const { students } = await resp.json();
        setStudents(students);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [teacherId]);

  return { students, loading, error };
}