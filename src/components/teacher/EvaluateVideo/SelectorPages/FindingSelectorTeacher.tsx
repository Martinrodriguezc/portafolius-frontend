import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { FindingSelectorProps } from "../../../../types/Props/Teacher/FindingSelectorProps"

export const FindingSelectorTeacher: React.FC<FindingSelectorProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`finding-${index}`}>Hallazgo</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`finding-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona hallazgo" />
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