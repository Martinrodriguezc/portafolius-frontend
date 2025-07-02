import axios, { AxiosResponse } from "axios";
import { config } from "../../../../../config/config";
import { authService } from "../../../../auth/authServices";
import { Material, CreateMaterialPayload } from "../../../../../types/material";
import { UserProps } from "../../../../../types/User";

export const fetchStudentsRequest = (): Promise<AxiosResponse<UserProps[]>> =>
  axios.get<UserProps[]>(
    `${config.SERVER_URL}/users?role=estudiante`,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );

export const createMaterialRequest = (
  formData: FormData
): Promise<AxiosResponse<{ material: Material }>> =>
  axios.post<{ material: Material }>(
    `${config.SERVER_URL}/materials`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const createLinkRequest = (
  payload: CreateMaterialPayload
): Promise<AxiosResponse<{ material: Material }>> => {
  const requestPayload = {
    type: payload.type,
    title: payload.title,
    description: payload.description,
    url: payload.url,
    studentIds: payload.studentIds
  };
  
  return axios.post<{ material: Material }>(
    `${config.SERVER_URL}/material/upload-url`,
    requestPayload,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export interface MaterialStats {
  totalStudents: number;
  studentsWith: number;
  studentsWithout: number;
  totalMaterials: number;
}

export const fetchMaterialStatsRequest = (): Promise<AxiosResponse<MaterialStats>> =>
  axios.get<MaterialStats>(
    `${config.SERVER_URL}/materials/summary`,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );