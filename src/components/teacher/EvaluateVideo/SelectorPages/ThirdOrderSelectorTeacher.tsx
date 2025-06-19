import React from "react";
import { Label } from "../../../common/Label/Label";
import { Select, SelectValue } from "../../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction";
import { SelectItem } from "../../../common/Select/SelectItems";
import { ThirdOrderProps } from "../../../../types/Props/Teacher/ThirdOrderProps";

export const ThirdOrderSelectorTeacher: React.FC<ThirdOrderProps> = ({
  index, options, value, onChange
}) => (
  <div>
    <Label htmlFor={`thirdorder-${index}`}>3er orden</Label>
    <Select
      value={value != null ? String(value) : ''}
      onValueChange={v => onChange(Number(v))}
      disabled={!options.length}
    >
      <SelectTrigger id={`thirdorder-${index}`} className="w-full">
        <SelectValue placeholder="Selecciona 3er orden" />
      </SelectTrigger>
      <SelectContent>
        {options.map(to => (
          <SelectItem key={to.id} value={String(to.id)}>
            {to.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);