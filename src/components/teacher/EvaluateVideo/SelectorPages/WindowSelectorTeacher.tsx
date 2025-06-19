import React from "react";
import { Label } from "../../../common/Label/Label";
import { Select, SelectValue } from "../../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction";
import { SelectItem } from "../../../common/Select/SelectItems";
import { WindowProps } from "../../../../types/Props/Teacher/WindowProps";

export const WindowSelectorTeacher: React.FC<WindowProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`window-${index}`}>Ventana</Label>
    <Select
      value={value != null ? String(value) : ''}
      onValueChange={v => onChange(Number(v))}
      disabled={!options.length}
    >
      <SelectTrigger id={`window-${index}`} className="w-full">
        <SelectValue placeholder="Selecciona ventana" />
      </SelectTrigger>
      <SelectContent>
        {options.map(w => (
          <SelectItem key={w.id} value={String(w.id)}>
            {w.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);