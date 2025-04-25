import { config } from "../../../../../config/config";
import { TeacherStats } from "../../../../../types/Teacher";
import { authService } from "../../../../auth/authServices";

export const fetchTeacherStats = async (
  teacherId: number
): Promise<TeacherStats> => {
  const token = authService.getToken();
  if (!token) {
    throw new Error("No autorizado");
  }

  const resp = await fetch(`${config.SERVER_URL}/teacher/${teacherId}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!resp.ok) {
    throw new Error(`Error ${resp.status} al obtener estadísticas`);
  }

  const data = (await resp.json()) as TeacherStats;
  return data;
};
