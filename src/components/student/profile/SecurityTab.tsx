import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { Label } from "../../common/Label/Label";
import BaseInput from "../../common/Input/Input";
import { LogOut } from "lucide-react";

export function SecurityTab() {
  return (
    <Card className="rounded-[16px] p-8">
      <h3 className="text-[16px] font-medium text-[#333333] mb-6">Cambiar contraseña</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-[14px] text-[#333333]">Contraseña actual</Label>
          <BaseInput id="currentPassword" type="password" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-[14px] text-[#333333]">Nueva contraseña</Label>
          <BaseInput id="newPassword" type="password" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[14px] text-[#333333]">Confirmar nueva contraseña</Label>
          <BaseInput id="confirmPassword" type="password" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]" />
        </div>

        <div className="pt-4">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
            Actualizar contraseña
          </Button>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#A0A0A0]/20">
        <h3 className="text-[16px] font-medium text-[#333333] mb-4">Cerrar sesión en todos los dispositivos</h3>
        <p className="text-[14px] text-[#A0A0A0] mb-4">
          Esta acción cerrará tu sesión en todos los dispositivos donde hayas iniciado sesión.
        </p>
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar todas las sesiones
        </Button>
      </div>
    </Card>
  );
}