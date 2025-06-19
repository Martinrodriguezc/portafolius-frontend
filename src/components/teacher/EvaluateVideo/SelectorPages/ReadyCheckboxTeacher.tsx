import React from "react";
import { Label } from "../../../common/Label/Label";
import { ReadyCheckboxProps } from "../../../../types/Props/Teacher/ReadyCheckboxProps";

export const ReadyCheckboxTeacher: React.FC<ReadyCheckboxProps> = ({
  index, checked, onChange
}) => (
  <div className="flex items-center gap-2">
    <input
      id={`ready-${index}`}
      type="checkbox"
      checked={checked || false}
      onChange={e => onChange(e.target.checked)}
    />
    <Label htmlFor={`ready-${index}`}>Listo</Label>
  </div>
);