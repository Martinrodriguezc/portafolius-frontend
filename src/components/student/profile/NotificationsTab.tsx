import React from "react";
import Card from "../../common/Card/Card";
import { Switch } from "../../common/Switch/Switch";
import { Bell, CheckSquare, MessageSquare, BookOpen } from "lucide-react";
import Button from "../../common/Button/Button";

interface NotificationsData {
  email: boolean;
  evaluations: boolean;
  comments: boolean;
  materials: boolean;
}

interface NotificationsTabProps {
  notifications: NotificationsData;
  handleNotificationChange: (key: keyof NotificationsData) => void;
}

export function NotificationsTab({ notifications, handleNotificationChange }: NotificationsTabProps) {
  return (
    <Card className="rounded-[16px] p-8">
      <h3 className="text-[16px] font-medium text-[#333333] mb-6">Preferencias de notificaciones</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[14px] font-medium text-[#333333]">Notificaciones por correo</h4>
            <p className="text-[13px] text-[#A0A0A0]">Recibir notificaciones generales por correo electrónico</p>
          </div>
          <Switch checked={notifications.email} onCheckedChange={() => handleNotificationChange("email")} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[14px] font-medium text-[#333333]">Evaluaciones de estudios</h4>
            <p className="text-[13px] text-[#A0A0A0]">Notificar cuando un profesor evalúe tus estudios</p>
          </div>
          <Switch checked={notifications.evaluations} onCheckedChange={() => handleNotificationChange("evaluations")} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[14px] font-medium text-[#333333]">Comentarios nuevos</h4>
            <p className="text-[13px] text-[#A0A0A0]">Notificar cuando haya nuevos comentarios en tus estudios</p>
          </div>
          <Switch checked={notifications.comments} onCheckedChange={() => handleNotificationChange("comments")} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[14px] font-medium text-[#333333]">Nuevo material de estudio</h4>
            <p className="text-[13px] text-[#A0A0A0]">Notificar cuando se añada nuevo material educativo</p>
          </div>
          <Switch checked={notifications.materials} onCheckedChange={() => handleNotificationChange("materials")} />
        </div>

        <div className="pt-4">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
            Guardar preferencias
          </Button>
        </div>
      </div>
    </Card>
  );
}