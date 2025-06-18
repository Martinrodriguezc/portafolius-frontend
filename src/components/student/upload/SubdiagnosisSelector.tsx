import React from "react";
import { Select, SelectValue } from "../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../common/Select/SelectInteraction";
import { SelectItem } from "../../common/Select/SelectItems";
import { SubdiagnosisOption } from "../../../types/protocol";

interface SubdiagnosisSelectorProps {
  options: SubdiagnosisOption[];
  value?: number;
  onChange: (id: number) => void;
}

export const SubdiagnosisSelector: React.FC<SubdiagnosisSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <Select
    value={value != null ? String(value) : ""}
    onValueChange={(v) => onChange(Number(v))}
  >
    <SelectTrigger className="h-10 border-[#A0A0A0] rounded-[8px] bg-white">
      <SelectValue placeholder="Selecciona subdiagnóstico" />
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