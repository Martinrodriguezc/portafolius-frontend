import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { FinalDiagnosis } from "../../../../types/Props/Teacher/FinalDiagnosis"

export const FinalDiagnosisSelectorTeacher: React.FC<FinalDiagnosis> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`finalDiagnosis-${index}`}>Diagnóstico final</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`finalDiagnosis-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona diagnóstico final" />
      </SelectTrigger>
      <SelectContent>
        {options.map(fd => (
          <SelectItem key={fd.id} value={String(fd.id)}>
            {fd.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)