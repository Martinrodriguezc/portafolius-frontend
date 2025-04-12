import React from "react";

//TODO: REVISAR
const variantStyles = {
  primary:
    "w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-4",
  secondary: "border border-[#A0A0A0] text-[#333333]",
  google: "w-full border border-[#A0A0A0] flex items-center justify-center",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "google";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const classes = [
    variantStyles[variant],
    "text-[14px] font-medium py-[12px] rounded-[8px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes}>{children}</button>;
};

export default Button;
