import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number;
}

function Progress({ className = "", value, ...props }: ProgressProps) {
  const baseClasses = "relative h-2 w-full overflow-hidden rounded-full";

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={`${baseClasses} ${className}`}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="
          absolute inset-0         
          bg-[#4E81BD]             
          transition-transform     
          duration-300 ease-in-out 
          will-change-transform   
        "
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
