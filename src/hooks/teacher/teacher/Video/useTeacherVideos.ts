import { useEffect, useState } from "react";
import { TeacherVideo } from "../../../../types/VideoTypes";
import { authService } from "../../../auth/authServices";
import { fetchTeacherVideos } from "./request/videoRequests";

export function useTeacherVideos() {
  const [pending, setPending] = useState<TeacherVideo[]>([]);
  const [evaluated, setEvaluated] = useState<TeacherVideo[]>([]);
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

    const loadVideos = async () => {
      try {
        const { pending, evaluated } = await fetchTeacherVideos(teacherId);
        setPending(pending);
        setEvaluated(evaluated);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar vídeos");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadVideos();
  }, [teacherId]);

  return { pending, evaluated, loading, error };
}
