import axios, { AxiosResponse } from "axios";
import { Material } from "../../../../types/material";
import { config } from "../../../../config/config";


export const fetchStudentMaterials = async (
  studentId: number
): Promise<Material[]> => {
  const response: AxiosResponse<Material[]> = await axios.get(
    `${config.SERVER_URL}/materials/student/${studentId}/`
  );
  return response.data;
};

