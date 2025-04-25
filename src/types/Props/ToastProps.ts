export interface ToastProps {
  message: string;
  type?: "error" | "success" | "warning";
  onClose: () => void;
}
