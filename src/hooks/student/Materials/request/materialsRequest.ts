import axios, { AxiosResponse } from "axios";
import { config } from "../../../../config/config";
import { authService } from "../../../auth/authServices";
import type { StudentMaterial } from "../../../../types/studentMaterial";

export const fetchStudentMaterials = (
  studentId: number
): Promise<AxiosResponse<StudentMaterial[]>> =>
  axios.get<StudentMaterial[]>(
    `${config.SERVER_URL}/materials/student/${studentId}`,
    {
      headers: { Authorization: `Bearer ${authService.getToken()}` },
      validateStatus: () => true,
    }
  );