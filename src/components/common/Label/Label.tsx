"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ children, className = "", ...props }) => {
  const baseClasses =
    "flex items-center gap-2 text-sm leading-none font-medium select-none"
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  )
}

export default Label