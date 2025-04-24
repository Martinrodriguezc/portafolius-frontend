import { useEffect, useState } from "react";
import { config } from "../../config/config";
import { authService } from "../../hooks/authServices";

export interface TeacherStats {
  pendingCount: number;
  evaluatedToday: number;
  studentCount: number;
}

export function useTeacherStats() {
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const user = authService.getCurrentUser();
  const teacherId = user?.id;

  useEffect(() => {
    if (!teacherId) {
      setError("No teacher ID");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const resp = await fetch(
          `${config.SERVER_URL}/teacher/${teacherId}/stats`,
          { headers: { Authorization: `Bearer ${authService.getToken()}` } }
        );
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const data: TeacherStats = await resp.json();
        setStats(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [teacherId]);

  return { stats, loading, error };
}