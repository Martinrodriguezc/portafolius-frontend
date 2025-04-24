import { config } from "../../../../config/config";
import { RawStudy } from "../../../../types/Study";
import { authService } from "../../../auth/authServices";



export const fetchStudentStudies = async (
  userId: string
): Promise<RawStudy[]> => {
  const token = authService.getToken();
  if (!token) throw new Error("No autorizado");

  const res = await fetch(`${config.SERVER_URL}/study/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener estudios`);
  }

  const { studies } = (await res.json()) as { studies: RawStudy[] };
  return studies;
};
