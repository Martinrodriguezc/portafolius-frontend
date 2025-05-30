import React, { ChangeEvent } from "react";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { PlatformSettingsProps } from "../../../types/Props/Settings/PlatformSettingsProps";

const PlatformSettings: React.FC<PlatformSettingsProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <Card className="border-none shadow-sm rounded-[16px]">
      <h3 className="text-[16px] font-medium text-[#333333] mb-6">
        Configuración de la plataforma
      </h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#333333]">
              Asignación automática
            </h4>
            <p className="text-xs text-gray-500">
              Asigna automáticamente los estudios nuevos a tu lista de
              evaluación.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoAssign}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("autoAssign", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#333333]">
              Notificaciones de nuevos estudios
            </h4>
            <p className="text-xs text-gray-500">
              Recibe notificaciones cuando se suban estudios nuevos.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifyNewStudies}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("notifyNewStudies", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#333333]">
              Mostrar calificaciones
            </h4>
            <p className="text-xs text-gray-500">
              Muestra el puntaje numérico en las evaluaciones.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.showScores}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("showScores", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#333333]">
              Permitir comentarios
            </h4>
            <p className="text-xs text-gray-500">
              Permite que los estudiantes comenten en las evaluaciones.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.allowComments}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("allowComments", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="defaultProtocol"
            className="block text-sm text-[#333333] font-medium"
          >
            Protocolo predeterminado
          </label>
          <select
            id="defaultProtocol"
            className="w-full h-10 text-sm border border-gray-300 rounded-md px-3 focus:outline-none focus:ring focus:border-blue-300"
            value={settings.defaultProtocol}
            onChange={(e) => onSettingChange("defaultProtocol", e.target.value)}
          >
            <option value="FATE">FATE</option>
            <option value="FAST">FAST</option>
            <option value="RUSH">RUSH</option>
            <option value="RUSH">BLUE</option>
            <option value="RUSH">FOCUS</option>
          </select>
        </div>
        <div className="pt-4">
          <Button>Guardar configuración</Button>
        </div>
      </div>
    </Card>
  );
};

export default PlatformSettings;
