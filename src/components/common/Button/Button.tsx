import { Slot } from "@radix-ui/react-slot";
import { ButtonProps } from "../../../types/Props/common/ButtonProps";
import {
  baseStyle,
  variantStyles,
  sizeStyles,
} from "../../../utils/ButtonStyles/styles";

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
