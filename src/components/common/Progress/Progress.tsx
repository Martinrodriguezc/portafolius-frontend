"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

function Progress({ className = "", value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const baseClasses = "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }