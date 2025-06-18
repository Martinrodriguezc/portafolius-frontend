import React from "react";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { WindowOption } from "../../../types/protocol";

interface WindowSelectorProps {
  options: WindowOption[];
  value?: number;
  onChange: (id: number) => void;
}

export const WindowSelector: React.FC<WindowSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select
    value={value != null ? String(value) : ""}
    onValueChange={(v) => onChange(Number(v))}
  >
    <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
      <SelectValue placeholder="Selecciona ventana" />
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