import React from "react";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { FindingSelectorProps } from "../../../types/Props/Upload/FindingSelectorProps";

export const FindingSelector: React.FC<FindingSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select
    value={value != null ? String(value) : ""}
    onValueChange={(v) => onChange(Number(v))}
  >
    <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
      <SelectValue placeholder="Selecciona hallazgo" />
    </SelectTrigger>
    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.id} value={String(opt.id)}>
          {opt.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);