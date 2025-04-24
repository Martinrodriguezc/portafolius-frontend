import { useEffect, useState, useCallback } from "react";
import { UserProfile, UseUserProfileReturn } from "../../../types/userProfile";
import { authService } from "../../auth/authServices";
import {
  fetchUserProfileRequest,
  updateUserProfileRequest,
} from "./requests/userProfileRequest";

export function useUserProfile(): UseUserProfileReturn {
  const userIdRaw = authService.getCurrentUser()?.id;
  const userId = typeof userIdRaw === "string" ? Number(userIdRaw) : userIdRaw;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (userId == null) {
      setError("No has iniciado sesión");
      setLoading(false);
      return;
    }
    try {
      const data = await fetchUserProfileRequest(userId);
      setProfile(data);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Error desconocido al cargar perfil");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (updates: Partial<Omit<UserProfile, "id">>) => {
      const data = await updateUserProfileRequest(updates);
      setProfile(data);
    },
    []
  );

  return { profile, loading, error, updateProfile };
}
