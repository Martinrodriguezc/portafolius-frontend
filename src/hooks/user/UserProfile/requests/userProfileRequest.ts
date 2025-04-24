import { config } from "../../../../config/config";
import { UserProfile } from "../../../../types/userProfile";
import { authService } from "../../../auth/authServices";

export const fetchUserProfileRequest = async (
  userId: number
): Promise<UserProfile> => {
  const resp = await fetch(`${config.SERVER_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  if (!resp.ok) {
    throw new Error(`Error ${resp.status} al cargar perfil`);
  }
  const data = (await resp.json()) as UserProfile;
  return {
    ...data,
    id: typeof data.id === "string" ? Number(data.id) : data.id,
  };
};

export const updateUserProfileRequest = async (
  updates: Partial<Omit<UserProfile, "id">>
): Promise<UserProfile> => {
  const updated = await authService.updateUserProfile(updates);
  if (updated.role == null) {
    throw new Error("Role no recibido al actualizar perfil");
  }
  return {
    ...updated,
    id: typeof updated.id === "string" ? Number(updated.id) : updated.id,
    role: updated.role as UserProfile["role"],
  };
};
