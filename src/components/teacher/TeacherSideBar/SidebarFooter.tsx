import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const SidebarFooter: React.FC = () => (
  <div className="p-4 border-t">
    <Link
      to="/"
      className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Cerrar Sesión
    </Link>
  </div>
);
