import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger(
  props: React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: "sm" | "default" }
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
    <SelectPrimitive.Trigger className={`${triggerClasses} ${className}`} {...rest}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent(props: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const { className = "", children, position = "popper", ...rest } = props;
  const contentClasses = [
    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg",
    "animate-in fade-in zoom-in overflow-x-hidden overflow-y-auto",
  ].join(" ");
  const positionClasses = position === "popper" ? "translate-y-1" : "";
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={`${contentClasses} ${positionClasses} ${className}`} position={position} {...rest}>
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

function SelectLabel(props: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.Label
      className={`px-2 py-1.5 text-xs font-semibold text-gray-500 ${className}`}
      {...rest}
    />
  );
}

function SelectItem(props: React.ComponentProps<typeof SelectPrimitive.Item>) {
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

function SelectSeparator(props: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.Separator
      className={`bg-gray-200 pointer-events-none -mx-1 my-1 h-px ${className}`}
      {...rest}
    />
  );
}

function SelectScrollUpButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton className={`flex items-center justify-center py-1 cursor-default ${className}`} {...rest}>
      <ChevronUpIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton(props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  const { className = "", ...rest } = props;
  return (
    <SelectPrimitive.ScrollDownButton className={`flex items-center justify-center py-1 cursor-default ${className}`} {...rest}>
      <ChevronDownIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};