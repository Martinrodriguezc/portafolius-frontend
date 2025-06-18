import React from "react";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { ProtocolOption } from "../../../types/protocol";

interface ProtocolSelectorProps {
  options: ProtocolOption[];
  value: string;
  onChange: (key: string) => void;
}

export const ProtocolSelector: React.FC<ProtocolSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
      <SelectValue placeholder="Selecciona protocolo" />
    </SelectTrigger>
    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.id} value={opt.key}>
          {opt.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);