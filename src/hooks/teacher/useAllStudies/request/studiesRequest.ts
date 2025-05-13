import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../config/config';
import { StudyWithStatus } from '../../../../types/Study';

export async function fetchAllStudiesRequest(): Promise<StudyWithStatus[]> {
  const url = `${config.SERVER_URL}/study/teacher/study-with-status`;
  const response: AxiosResponse<{ studies: StudyWithStatus[] }> = await axios.get(url, {
    validateStatus: () => true,
  });
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener estudios`);
  }
  return response.data.studies;
}
