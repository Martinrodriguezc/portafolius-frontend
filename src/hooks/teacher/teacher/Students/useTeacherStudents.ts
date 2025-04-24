import { useEffect, useState } from "react";
import { fetchTeacherStudents } from "./request/useTeacherStudentsRequests";
import { TeacherStudent } from "../../../../types/Student";

export function useTeacherStudents(teacherId?: number) {
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (teacherId == null) {
      setLoading(false);
      return;
    }

    const loadStudents = async () => {
      try {
        const list = await fetchTeacherStudents(teacherId);
        setStudents(list);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error al cargar estudiantes");
      } finally {
        setLoading(false);
      }
    };

    void loadStudents();
  }, [teacherId]);

  return { students, loading, error };
}
