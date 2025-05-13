import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { Study } from '../../../../../types/Study';

export async function fetchStudentStudies(
  studentId: number
): Promise<Study[]> {
  const url = `${config.SERVER_URL}/study/${studentId}`;
  const response: AxiosResponse<{ studies: Study[] }> = await axios.get(url, {
    validateStatus: () => true,
  });
  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener estudios`);
  }
  return response.data.studies;
}
