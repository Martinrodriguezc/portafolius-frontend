import React from "react";

const baseStyle =
  "text-[14px] font-medium py-[12px] rounded-[8px] transition-colors duration-300 cursor-pointer hover:bg-blue-700";

const variantStyles = {
  primary: "bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white flex items-center justify-center",
  secondary: "border border-[#A0A0A0] text-[#333333]",
  google: "border border-[#A0A0A0] flex items-center justify-center hover:bg-gray-200",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "google";
  className?: string;
  fixedWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  fixedWidth = true,
  ...props
}) => {
  const widthClass = "w-64";

  const combinedClasses = [
    fixedWidth ? widthClass : "w-full",
    baseStyle,
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
