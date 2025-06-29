import React from "react"
import { Label } from "../../../common/Label/Label"
import { Select, SelectValue } from "../../../common/Select/SelectBase"
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction"
import { SelectItem } from "../../../common/Select/SelectItems"
import { SubSubdiagnosisSelectorProps } from "../../../../types/Props/Teacher/SubSubProps"

export const SubSubSelectorTeacher: React.FC<SubSubdiagnosisSelectorProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`subsub-${index}`}>Sub-Subdiagnóstico</Label>
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={v => onChange(Number(v))}
    >
      <SelectTrigger id={`subsub-${index}`} className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
        <SelectValue placeholder="Selecciona sub-subdiagnóstico" />
      </SelectTrigger>
      <SelectContent>
        {options.map(ss => (
          <SelectItem key={ss.id} value={String(ss.id)}>
            {ss.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)