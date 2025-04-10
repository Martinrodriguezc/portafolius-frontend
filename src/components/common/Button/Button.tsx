import { ButtonProps } from "./types";

const variantStyles = {
  primary: "bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white",
  secondary: "border border-[#A0A0A0] text-[#333333]",
  google: "border border-[#A0A0A0] flex items-center justify-center",
};

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        text-[14px] font-medium py-[12px] rounded-[8px]
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};
