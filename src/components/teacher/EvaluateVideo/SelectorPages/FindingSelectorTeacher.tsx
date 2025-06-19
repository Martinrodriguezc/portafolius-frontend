import React from "react";
import { Label } from "../../../common/Label/Label";
import { Select, SelectValue } from "../../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction";
import { SelectItem } from "../../../common/Select/SelectItems";
import { FindingSelectorProps } from "../../../../types/Props/Teacher/FindingSelectorProps";

export const FindingSelectorTeacher: React.FC<FindingSelectorProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`finding-${index}`}>Hallazgo</Label>
    <Select
      value={value != null ? String(value) : ''}
      onValueChange={v => onChange(Number(v))}
      disabled={!options.length}
    >
      <SelectTrigger id={`finding-${index}`} className="w-full">
        <SelectValue placeholder="Selecciona hallazgo" />
      </SelectTrigger>
      <SelectContent>
        {options.map(f => (
          <SelectItem key={f.id} value={String(f.id)}>
            {f.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);