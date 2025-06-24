import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { DiagnosisSelectorTeacherProps } from "../../../../types/Props/Teacher/DiagnosisSelectorProps"

export const DiagnosisSelectorTeacher: React.FC<DiagnosisSelectorTeacherProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`diagnosis-${index}`}>Diagnóstico posible</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`diagnosis-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona diagnóstico" />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.id} value={String(opt.id)}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)