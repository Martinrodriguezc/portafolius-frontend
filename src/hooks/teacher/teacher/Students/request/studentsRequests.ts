import axios, { AxiosResponse } from 'axios';
import { config } from '../../../../../config/config';
import { TeacherStudent } from '../../../../../types/student';

export async function fetchTeacherStudents(
  teacherId: number
): Promise<TeacherStudent[]> {
  const url = `${config.SERVER_URL}/teacher/${teacherId}/students`;
  const response: AxiosResponse<{ students: TeacherStudent[] }> =
    await axios.get(url, { validateStatus: () => true });

  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al obtener estudiantes`);
  }

  return response.data.students;
}
