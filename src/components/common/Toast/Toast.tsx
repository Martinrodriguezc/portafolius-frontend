import { useEffect } from "react";
import { ToastProps } from "../../../types/Props/ToastProps";

const Toast: React.FC<ToastProps> = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  }[type];

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded border ${bgColor} z-50`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Toast;
