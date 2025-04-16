import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon } from "lucide-react";

export function SelectLabel(props: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.Label className={`px-2 py-1.5 text-xs font-semibold text-gray-500 ${className}`} {...rest} />
  );
}

export function SelectItem(props: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const { className = "", children, ...rest } = props;
  const itemClasses = [
    "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
    "outline-none select-none focus:bg-blue-100 focus:text-blue-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" ");
  return (
    <SelectPrimitive.Item className={`${itemClasses} ${className}`} {...rest}>
      <span className="absolute right-2 flex items-center justify-center w-5 h-5">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="w-4 h-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator(props: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.Separator className={`bg-gray-200 pointer-events-none -mx-1 my-1 h-px ${className}`} {...rest} />
  );
}