import { useEffect, useState, useCallback } from "react";
import { config } from "../../config/config";
import { authService } from "../auth/authServices";

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "estudiante" | "profesor" | "admin" | "google_login";
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<Omit<UserProfile, "id">>) => Promise<void>;
}

export function useUserProfile(): UseUserProfileReturn {
  const stored = authService.getCurrentUser();
  const userId = stored?.id ?? stored?.user?.id;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setError("No has iniciado sesión");
      setLoading(false);
      return;
    }
    try {
      const resp = await fetch(`${config.SERVER_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      if (!resp.ok) throw new Error(`Error ${resp.status}`);
      setProfile(await resp.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(
    async (updates: Partial<Omit<UserProfile, "id">>) => {
      const updated = await authService.updateUserProfile(updates);
      setProfile(updated);
    },
    []
  );

  return { profile, loading, error, updateProfile };
}
