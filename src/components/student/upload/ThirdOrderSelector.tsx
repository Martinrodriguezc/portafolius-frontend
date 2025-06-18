import React from "react";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { ThirdOrderOption } from "../../../types/protocol";

interface ThirdOrderSelectorProps {
  options: ThirdOrderOption[];
  value?: number;
  onChange: (id: number) => void;
}

export const ThirdOrderSelector: React.FC<ThirdOrderSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select
    value={value != null ? String(value) : ""}
    onValueChange={(v) => onChange(Number(v))}
  >
    <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
      <SelectValue placeholder="Selecciona nivel avanzado" />
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