import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { studentMenuItems, isActivePath } from "../../../utils/sidebarUtils";

export default function StudentSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#F4F4F4] h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-[24px] font-bold text-[#4E81BD]">PortafoliUS</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {studentMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActivePath(location.pathname, item.path)
                    ? "bg-white text-[#4E81BD]"
                    : "text-[#333333] hover:bg-white/50"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#E0E0E0]">
        <Link
          to="/"
          className="flex items-center px-4 py-2 rounded-md text-[#333333] hover:bg-white/50 transition-colors duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}