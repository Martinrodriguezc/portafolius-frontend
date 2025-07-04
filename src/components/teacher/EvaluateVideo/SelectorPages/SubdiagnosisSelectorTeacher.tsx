import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { SubdiagnosisSelectorProps } from "../../../../types/Props/Teacher/SubdiagnosisProps"

export const SubdiagnosisSelectorTeacher: React.FC<SubdiagnosisSelectorProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`subdiagnosis-${index}`}>Subdiagnóstico</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`subdiagnosis-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona subdiagnóstico" />
      </SelectTrigger>
      <SelectContent>
        {options.map(sd => (
          <SelectItem key={sd.id} value={String(sd.id)}>
            {sd.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)