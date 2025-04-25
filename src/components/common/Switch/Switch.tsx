import * as SwitchPrimitive from "@radix-ui/react-switch";
import { baseClasses, thumbClasses } from "../../../utils/SwitchStyles/styles";

function Switch({
  className = "",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={thumbClasses}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
