import axios, { AxiosResponse } from "axios";
import { LoginFormData } from "../../../types/form/Login";
import { config } from "../../../config/config";
import { RegisterFormData } from "../../../types/form/Register";
import { AuthResponse, UserProps } from "../../../types/User";

export const loginRequest = (
  credentials: LoginFormData
): Promise<AxiosResponse<AuthResponse>> =>
  axios.post<AuthResponse>(`${config.SERVER_URL}/auth/login`, credentials);

export const registerRequest = (
  userData: RegisterFormData
): Promise<AxiosResponse<AuthResponse>> =>
  axios.post<AuthResponse>(`${config.SERVER_URL}/auth/register`, userData);

export const initiateGoogleLoginRequest = (): string =>
  `${config.SERVER_URL}/auth/google`;

export const handleGoogleCallbackRequest = (
  code: string
): Promise<AxiosResponse<AuthResponse>> =>
  axios.get<AuthResponse>(
    `${config.SERVER_URL}/auth/google/callback?code=${code}`
  );

export const updateUserRoleRequest = (
  userId: string,
  payload: { firstName: string; lastName: string; role: string },
  token: string
): Promise<AxiosResponse<{ user: UserProps }>> =>
  axios.put<{ user: UserProps }>(
    `${config.SERVER_URL}/users/${userId}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const updateUserProfileRequest = (
  userId: string,
  payload: { firstName?: string; lastName?: string; email?: string },
  token: string
): Promise<AxiosResponse<{ user: UserProps }>> =>
  axios.put<{ user: UserProps }>(
    `${config.SERVER_URL}/users/${userId}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
