import { useState } from "react";
import { ProfileData } from "../../types/Props/Tabs/PersonalTabProps";
import { NotificationsData } from "../../types/Props/Tabs/NotificationsTabProps";

export function useProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    specialty: "",
    year: "",
    avatar: "",
  });

  const [notifications, setNotifications] = useState<NotificationsData>({
    email: true,
    evaluations: true,
    comments: true,
    materials: false,
  });

  function handleNotificationChange(key: keyof NotificationsData) {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  }

  return {
    profile,
    setProfile,
    notifications,
    handleNotificationChange,
  };
}
