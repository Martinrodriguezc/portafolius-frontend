import { config } from "../../../../config/config";
import { StudyWithStatus } from "../../../../types/Study";

export const fetchAllStudiesRequest = async (): Promise<StudyWithStatus[]> => {
  const res = await fetch(
    `${config.SERVER_URL}/study/teacher/study-with-status`
  );
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener estudios`);
  }
  const data = (await res.json()) as { studies: StudyWithStatus[] };
  return data.studies;
};
