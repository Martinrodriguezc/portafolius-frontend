import { config } from "../../../../../config/config";
import { TeacherVideo } from "../../../../../types/video";
import { authService } from "../../../../auth/authServices";

export const fetchTeacherVideos = async (
  teacherId: number
): Promise<{ pending: TeacherVideo[]; evaluated: TeacherVideo[] }> => {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const resp = await fetch(`${config.SERVER_URL}/teacher/${teacherId}/videos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    throw new Error(`Error ${resp.status} al obtener vídeos`);
  }

  const data = (await resp.json()) as {
    pending: TeacherVideo[];
    evaluated: TeacherVideo[];
  };
  return data;
};

