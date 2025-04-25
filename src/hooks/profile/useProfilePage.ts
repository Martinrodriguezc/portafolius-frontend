import { useState } from "react";
import { ProfileData } from "../../types/Props/Tabs/PersonalTabProps";
import { NotificationsData } from "../../types/Props/Tabs/NotificationsTabProps";

export function useProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    institution: "Universidad Médica Nacional",
    specialty: "Medicina de Emergencias",
    year: "3er año de residencia",
    avatar: "/placeholder.svg?height=100&width=100",
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
