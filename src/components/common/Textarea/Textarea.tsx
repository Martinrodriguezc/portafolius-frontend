import * as React from "react";
import { baseClasses } from "../../../utils/TextAreaStyles/styles";

function Textarea({
  className = "",
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

export { Textarea };
