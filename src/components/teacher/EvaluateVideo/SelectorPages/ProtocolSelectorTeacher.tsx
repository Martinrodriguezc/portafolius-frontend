import React from "react";
import { Label } from "../../../common/Label/Label";
import { Select, SelectValue } from "../../../common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../../common/Select/SelectInteraction";
import { SelectItem } from "../../../common/Select/SelectItems";
import { ProtocolSelectorProps } from "../../../../types/Props/Teacher/ProtocolSelectorProps";

export const ProtocolSelectorTeacher: React.FC<ProtocolSelectorProps> = ({
  index, protocols, value, onChange
}) => (
  <div>
    <Label htmlFor={`protocol-${index}`}>Protocolo</Label>
    <Select value={value || ''} onValueChange={onChange}>
      <SelectTrigger id={`protocol-${index}`} className="w-full">
        <SelectValue placeholder="Selecciona protocolo" />
      </SelectTrigger>
      <SelectContent>
        {protocols.map(p => (
          <SelectItem key={p.id} value={p.key}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);