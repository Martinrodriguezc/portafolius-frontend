"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

const Switch: React.FC<SwitchProps> = ({ className = "", ...props }) => {
  const baseClasses =
    "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"

  const thumbClasses =
    "bg-background pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumbClasses} />
    </SwitchPrimitive.Root>
  )
}

export default Switch