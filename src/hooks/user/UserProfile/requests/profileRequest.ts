import axios, { AxiosResponse, AxiosError } from 'axios';
import { config } from '../../../../config/config';
import { UserProfile } from '../../../../types/User';
import { authService } from '../../../auth/authServices';
import { handleAuthError, redirectToLogin, createAuthHeaders } from '../../../../utils/authErrorHandler';

export async function fetchUserProfileRequest(
  userId: number
): Promise<UserProfile> {
  const response: AxiosResponse<UserProfile | { id: string }> = await axios.get(
    `${config.SERVER_URL}/users/${userId}`,
    {
      headers: createAuthHeaders(),
      validateStatus: () => true,
    }
  );

  const authErrorInfo = handleAuthError({ response });
  if (authErrorInfo.isAuthError) {
    if (authErrorInfo.shouldRedirect) {
      redirectToLogin();
      return {} as UserProfile; // Esta línea nunca se ejecutará debido al redirect, pero TypeScript lo requiere
    }
    throw new Error(authErrorInfo.message);
  }

  if (response.status !== 200) {
    throw new Error(`Error ${response.status} al cargar perfil`);
  }

  const data = response.data as UserProfile;
  return {
    ...data,
    id: typeof data.id === 'string' ? Number(data.id) : data.id,
  };
}

export async function updateUserProfileRequest(
  updates: Partial<Omit<UserProfile, 'id'>>
): Promise<UserProfile> {
  try {
    const updated = await authService.updateUserProfile(updates);

    if (updated.role == null) {
      throw new Error('Role no recibido al actualizar perfil');
    }

    return {
      ...updated,
      id: typeof updated.id === 'string' ? Number(updated.id) : updated.id,
      role: updated.role as UserProfile['role'],
    };
  } catch (error) {
    const authErrorInfo = handleAuthError(error as AxiosError);
    if (authErrorInfo.isAuthError) {
      if (authErrorInfo.shouldRedirect) {
        redirectToLogin();
      }
      throw new Error(authErrorInfo.message);
    }
    throw error;
  }
}
