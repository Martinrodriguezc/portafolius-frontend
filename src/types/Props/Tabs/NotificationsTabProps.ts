export interface NotificationsData {
  email: boolean;
  evaluations: boolean;
  comments: boolean;
  materials: boolean;
}

export interface NotificationsTabProps {
  notifications: NotificationsData;
  handleNotificationChange: (key: keyof NotificationsData) => void;
}
