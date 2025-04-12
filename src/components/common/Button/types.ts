export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "google";
  fullWidth?: boolean;
  isLoading?: boolean;
}
