import { useState, useEffect } from "react";
import { authService } from "../../auth/authServices";
import { useTeacherStats } from "../teacher/Stats/useTeacherStats";
import { useTeacherVideos } from "../teacher/Video/useTeacherVideos";

export function useTeacherDashboard() {
  const [lastName, setLastName] = useState(() => {
    const user = authService.getCurrentUser();
    return user?.last_name ?? "";
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setLastName(detail.last_name);
    };
    window.addEventListener("userUpdated", handler);
    return () => {
      window.removeEventListener("userUpdated", handler);
    };
  }, []);

  const { stats, loading: statsLoading, error: statsError } = useTeacherStats();
  const {
    pending,
    evaluated,
    loading: vidsLoading,
    error: vidsError,
  } = useTeacherVideos();

  return {
    lastName,
    stats,
    statsLoading,
    statsError,
    pending,
    evaluated,
    vidsLoading,
    vidsError,
  };
}
