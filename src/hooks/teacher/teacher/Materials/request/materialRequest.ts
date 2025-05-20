import axios, { AxiosResponse } from "axios";
import { config } from "../../../../../config/config";
import { authService } from "../../../../auth/authServices";
import { CreateMaterialPayload, Material } from "../../../../../types/material";
import { UserProps } from "../../../../../types/User";

export const fetchStudentsRequest = (): Promise<AxiosResponse<UserProps[]>> =>
  axios.get<UserProps[]>(
    `${config.SERVER_URL}/users?role=estudiante`,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );

export const createMaterialRequest = (
  payload: CreateMaterialPayload
): Promise<AxiosResponse<{ material: Material }>> =>
  axios.post<{ material: Material }>(
    `${config.SERVER_URL}/materials`,
    payload,
    { headers: { Authorization: `Bearer ${authService.getToken()}` } }
  );