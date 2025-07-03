import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../../auth/authServices";
import { UserProfileProps } from "../../../types/Props/UserProfileProps";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error("Sesión vencida");
      const { data } = await axios.get<UserProfileProps>(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        { headers: { Authorization: `Bearer ${authService.getToken()}` } }
      );
      setProfile(data);
    } catch (e: any) {
      setError(e.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const handler = () => load(); 
    window.addEventListener("userUpdated", handler);
    return () => window.removeEventListener("userUpdated", handler);
  }, []);

  const updateProfile = async (upd: Partial<Omit<UserProfileProps, "id">>) => {
    if (!profile) throw new Error("Sesión vencida");
    const { first_name, last_name, email } = upd;
    const { data } = await axios.put<UserProfileProps>(
      `${import.meta.env.VITE_API_URL}/users/${profile.id}`,
      { first_name, last_name, email },
      { headers: { Authorization: `Bearer ${authService.getToken()}` } }
    );
    authService.getCurrentUser(); 
    window.dispatchEvent(new CustomEvent("userUpdated", { detail: data }));
    await load();
  };

  return { profile, loading, error, updateProfile };
}