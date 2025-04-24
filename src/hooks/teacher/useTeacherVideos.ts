import { useEffect, useState } from "react";
import { config } from "../../config/config";
import { authService } from "../auth/authServices";

export interface TeacherVideo {
  id: number;
  study_id: number;
  original_filename: string;
  upload_date: string;
  duration_seconds: number;
  evaluated_at?: string;
  score?: number;
}

export function useTeacherVideos() {
  const [pending, setPending] = useState<TeacherVideo[]>([]);
  const [evaluated, setEvaluated] = useState<TeacherVideo[]>([]);
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
          `${config.SERVER_URL}/teacher/${teacherId}/videos`,
          { headers: { Authorization: `Bearer ${authService.getToken()}` } }
        );
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const data: { pending: TeacherVideo[]; evaluated: TeacherVideo[] } =
          await resp.json();
        setPending(data.pending);
        setEvaluated(data.evaluated);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [teacherId]);

  return { pending, evaluated, loading, error };
}
