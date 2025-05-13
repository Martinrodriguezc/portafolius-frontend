import { useEffect, useState } from "react";
import { authService } from "../../../auth/authServices";
import { fetchTeacherStats } from "./request/statsRequest";
import { TeacherStats } from "../../../../types/Teacher";

export function useTeacherStats() {
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const user = authService.getCurrentUser();
  const teacherIdRaw = user?.id;
  const teacherId =
    typeof teacherIdRaw === "string" ? Number(teacherIdRaw) : teacherIdRaw;

  useEffect(() => {
    if (teacherId == null) {
      setError("No teacher ID");
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        const data = await fetchTeacherStats(teacherId);
        setStats(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar estadísticas");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, [teacherId]);

  return { stats, loading, error };
}
