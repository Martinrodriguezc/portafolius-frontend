import React from "react"
import { Label } from "../../../common/Label/Label"
import { Props } from "../../../../types/Props/Teacher/CommentSectionProps"

export const CommentSectionTeacher: React.FC<Props> = ({
  index, value, onChange
}) => (
  <div>
    <Label htmlFor={`comment-${index}`}>Comentario</Label>
    <textarea
      id={`comment-${index}`}
      className="w-full border rounded p-2"
      rows={2}
      placeholder="Comentario opcional"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
    />
  </div>
)