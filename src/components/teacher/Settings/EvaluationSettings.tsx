import React, { ChangeEvent } from "react";
import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { EvaluationSettingsProps } from "../../../types/Props/EvaluationSettingsProps";

const EvaluationSettings: React.FC<EvaluationSettingsProps> = ({
  evaluationSettings,
  onSettingChange,
}) => {
  return (
    <Card className="border-none shadow-sm rounded-[16px]">
      <h3 className="text-[16px] font-medium text-[#333333] mb-6">
        Configuración de evaluación
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="evaluationTemplate"
            className="text-sm text-[#333333] font-medium"
          >
            Plantilla de evaluación
          </label>
          <select
            id="evaluationTemplate"
            className="w-full h-10 text-sm border border-gray-300 rounded-md px-3 focus:outline-none focus:ring focus:border-blue-300"
            value={evaluationSettings.evaluationTemplate}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onSettingChange("evaluationTemplate", e.target.value)
            }
          >
            <option value="Plantilla estándar">Plantilla estándar</option>
            <option value="Plantilla detallada">Plantilla detallada</option>
            <option value="Plantilla rápida">Plantilla rápida</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="minScore"
            className="text-sm text-[#333333] font-medium"
          >
            Calificación mínima aprobatoria
          </label>
          <Input
            id="minScore"
            type="number"
            min="1"
            max="10"
            value={evaluationSettings.minScore}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("minScore", Number(e.target.value))
            }
            className="h-10 text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="maxVideosPerDay"
            className="text-sm text-[#333333] font-medium"
          >
            Máximo de videos a evaluar por día
          </label>
          <Input
            id="maxVideosPerDay"
            type="number"
            min="1"
            value={evaluationSettings.maxVideosPerDay}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("maxVideosPerDay", Number(e.target.value))
            }
            className="h-10 text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-[#333333]">
              Publicación automática
            </h4>
            <p className="text-xs text-gray-500">
              Publica automáticamente las evaluaciones una vez completadas.
            </p>
          </div>
          <input
            type="checkbox"
            checked={evaluationSettings.autoPublish}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSettingChange("autoPublish", e.target.checked)
            }
            className="w-5 h-5"
          />
        </div>

        <div className="pt-4">
          <Button>Guardar configuración</Button>
        </div>
      </div>
    </Card>
  );
};

export default EvaluationSettings;
