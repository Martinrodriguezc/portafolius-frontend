import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { ImageQualityProps } from "../../../../types/Props/Teacher/ImageQualityProps"

export const ImageQualitySelectorTeacher: React.FC<ImageQualityProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`imageQuality-${index}`}>Calidad de imagen</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`imageQuality-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona calidad" />
      </SelectTrigger>
      <SelectContent>
        {options.map(iq => (
          <SelectItem key={iq.id} value={String(iq.id)}>
            {iq.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)