import { useEffect, useState } from "react";
import { fetchTeacherStudents } from "./request/studentsRequests";
import { TeacherStudent } from "../../../../types/student";

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
