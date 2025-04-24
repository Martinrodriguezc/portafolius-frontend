export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "google" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  className?: string;
  fixedWidth?: boolean;
  asChild?: boolean;
}
