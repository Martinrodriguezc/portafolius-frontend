import { config } from "../../../../../config/config";
import { Study } from "../../../../../types/Study";

export const fetchStudentStudies = async (
  studentId: number
): Promise<Study[]> => {
  const res = await fetch(`${config.SERVER_URL}/study/${studentId}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener estudios`);
  }
  const data = (await res.json()) as { studies: Study[] };
  return data.studies;
};
