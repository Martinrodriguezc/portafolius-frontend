import { useEffect, useState } from "react";

import { useCurrentUser }   from "../../user/useCurrentUser";
import { useTeacherStats }  from "../teacher/Stats/useTeacherStats";
import { useTeacherVideos } from "../teacher/Video/useTeacherVideos";

export function useTeacherDashboard() {
  const user = useCurrentUser();

  const [lastName, setLastName] = useState(user?.last_name ?? "");

  useEffect(() => {
    setLastName(user?.last_name ?? "");
  }, [user?.last_name]);

  const {
    stats,
    loading: statsLoading,
    error:   statsError,
  } = useTeacherStats();

  const {
    pending,
    evaluated,
    loading: vidsLoading,
    error:   vidsError,
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