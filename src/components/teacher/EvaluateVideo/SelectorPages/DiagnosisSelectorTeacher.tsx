import React from "react";
import { Label } from "../../../common/Label/Label";
import { Select, SelectValue } from "../../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction";
import { SelectItem } from "../../../common/Select/SelectItems";
import { DiagnosisSelectorTeacherProps } from "../../../../types/Props/Teacher/DiagnosisSelectorProps";

export const DiagnosisSelectorTeacher: React.FC<DiagnosisSelectorTeacherProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`diagnosis-${index}`}>Diagnóstico posible</Label>
    <Select
      value={value != null ? String(value) : ''}
      onValueChange={v => onChange(Number(v))}
      disabled={!options.length}
    >
      <SelectTrigger id={`diagnosis-${index}`} className="w-full">
        <SelectValue placeholder="Selecciona diagnóstico" />
      </SelectTrigger>
      <SelectContent>
        {options.map(d => (
          <SelectItem key={d.id} value={String(d.id)}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);