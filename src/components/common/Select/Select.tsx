"use client"

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// Helper local para concatenar clases
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ===================
// Select Root & Group & Value
// ===================
function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

// ===================
// Select Trigger
// ===================
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: "sm" | "default" }) {
  // Adaptamos las clases para que se vea como en v0,
  // pero usando estilos explícitos (p.ej., fondo blanco, borde gris, etc.)
  const baseClasses = [
    "flex items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-colors outline-none",
    "border border-gray-300",
    "focus-visible:ring-[3px] focus-visible:ring-blue-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
    size === "default" ? "h-9" : "h-8",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:w-4 [&_svg]:h-4",
  ].join(" ");
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// ===================
// Select Content (menú desplegable)
// ===================
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  // Usamos estilos explícitos para el contenedor del menú
  const baseClasses = [
    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg",
    "animate-in fade-in zoom-in",
    "overflow-x-hidden overflow-y-auto",
  ].join(" ");
  const positionClasses =
    position === "popper"
      ? "translate-y-1 -translate-x-1 translate-x-1 -translate-y-1"
      : "";
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={`${baseClasses} ${positionClasses} ${className}`}
        position={position}
        {...props}
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

// ===================
// Select Label
// ===================
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  const baseClasses = "px-2 py-1.5 text-xs font-semibold text-gray-500";
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

// ===================
// Select Item
// ===================
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  // Estilos para cada opción del menú
  const baseClasses = [
    "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
    "outline-none select-none focus:bg-blue-100 focus:text-blue-700",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" ");
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <span className="absolute right-2 flex items-center justify-center w-5 h-5">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="w-4 h-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// ===================
// Select Separator
// ===================
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  const baseClasses = "bg-gray-200 pointer-events-none -mx-1 my-1 h-px";
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}

// ===================
// Scroll Buttons
// ===================
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  const baseClasses = "flex items-center justify-center py-1 cursor-default";
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <ChevronUpIcon className="w-4 h-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  const baseClasses = "flex items-center justify-center py-1 cursor-default";
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={`${baseClasses} ${className}`}
      {...props}
    >
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