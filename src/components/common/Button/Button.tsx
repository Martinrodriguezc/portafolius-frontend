import React from "react";
import { Slot } from "@radix-ui/react-slot";

const baseStyle =
  "text-[14px] font-medium py-[12px] rounded-[8px] transition-colors duration-300 cursor-pointer";
const variantStyles = {
  primary: "bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white flex items-center justify-center",
  secondary: "border border-[#A0A0A0] text-[#333333] flex items-center justify-center",
  google: "border border-[#A0A0A0] flex items-center justify-center hover:bg-gray-200",
  outline: "border border-[#A0A0A0] text-[#333333] flex items-center justify-center hover:bg-gray-100",
  ghost: "bg-transparent text-[#333333] hover:bg-gray-100 flex items-center justify-center",
};
const sizeStyles = {
  default: "",
  sm: "h-8 px-3 py-1.5 text-sm",
  icon: "h-12 w-12 p-0 rounded-full",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "google" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  className?: string;
  fixedWidth?: boolean;
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  fixedWidth = true,
  asChild = false,
  ...props
}) => {
  const widthClass = fixedWidth ? "w-64" : "w-full";
  const combinedClasses = [
    widthClass,
    baseStyle,
    variantStyles[variant] || "",
    sizeStyles[size] || "",
    className,
  ]
    .join(" ")
    .trim();

  const Comp: React.ElementType = asChild ? Slot : "button";

  return (
    <Comp className={combinedClasses} {...props}>
      {children}
    </Comp>
  );
};

export default Button;
