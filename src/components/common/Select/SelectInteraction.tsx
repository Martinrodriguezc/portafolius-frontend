import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function SelectTrigger(
  props: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
  }
) {
  const { className = "", size = "default", children, ...rest } = props;
  const triggerClasses = [
    "flex items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-sm",
    "whitespace-nowrap shadow-xs transition-colors outline-none border border-gray-300",
    "focus-visible:ring-[3px] focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
    size === "default" ? "h-9" : "h-8",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:w-4 [&_svg]:h-4",
  ].join(" ");
  return (
    <SelectPrimitive.Trigger
      className={`${triggerClasses} ${className}`}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectScrollUpButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      className={`flex items-center justify-center py-1 cursor-default ${className}`}
      {...rest}
    >
      <ChevronUpIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.ScrollDownButton
      className={`flex items-center justify-center py-1 cursor-default ${className}`}
      {...rest}
    >
      <ChevronDownIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export function SelectContent(
  props: React.ComponentProps<typeof SelectPrimitive.Content>
) {
  const { className = "", children, position = "popper", ...rest } = props;
  const contentClasses = [
    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg",
    "animate-in fade-in zoom-in overflow-x-hidden overflow-y-auto",
  ].join(" ");
  const positionClasses = position === "popper" ? "translate-y-1" : "";
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={`${contentClasses} ${positionClasses} ${className}`}
        position={position}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={`p-1 ${
            position === "popper"
              ? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
              : ""
          }`}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
