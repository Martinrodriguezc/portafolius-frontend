import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export const StudentSidebarFooter: React.FC = () => (
  <div className="p-4 border-t border-[#E0E0E0]">
    <Link
      to="/"
      className="flex items-center px-4 py-2 rounded-md text-[#333333] hover:bg-white/50 transition-colors duration-200"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Cerrar Sesión
    </Link>
  </div>
);