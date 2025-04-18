import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { authService } from "../../../hooks/authServices";

export const StudentSidebarFooter: React.FC = () => {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="p-4 border-t border-[#E0E0E0]">
      <Link
        to="/"
        onClick={handleLogout}
        className="flex items-center px-4 py-2 rounded-md text-[#333333] hover:bg-white/50 transition-colors duration-200"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Cerrar Sesión
      </Link>
    </div>
  );
};