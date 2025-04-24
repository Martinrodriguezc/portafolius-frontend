import { config } from "../../../../../config/config";
import { TeacherStudent } from "../../../../../types/studentType";

export const fetchTeacherStudents = async (
  teacherId: number
): Promise<TeacherStudent[]> => {
  const res = await fetch(`${config.SERVER_URL}/teacher/${teacherId}/students`);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener estudiantes`);
  }
  const data = (await res.json()) as { students: TeacherStudent[] };
  return data.students;
};
