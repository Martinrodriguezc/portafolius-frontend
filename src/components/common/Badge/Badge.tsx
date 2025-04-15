import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap shrink-0 gap-1 overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
        secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
        destructive: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({
  className = "",
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={`${badgeVariants({ variant })} ${className}`.trim()}
      {...props}
    />
  );
}