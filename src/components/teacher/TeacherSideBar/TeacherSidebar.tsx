import { CheckSquare, Home, Settings, Users } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavLink } from "./SidebarNavlink";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom";

export default function TeacherSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  // Función para determinar si la ruta está activa
  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <SidebarHeader />
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <SidebarNavLink
            to="/teacher"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            isActive={
              isActive("/teacher") &&
              !isActive("/teacher/students") &&
              !isActive("/teacher/settings")
            }
          />
          <SidebarNavLink
            to="/teacher/evaluations"
            icon={<CheckSquare className="h-5 w-5" />}
            label="Evaluaciones"
            isActive={isActive("/teacher/evaluations")}
          />
          <SidebarNavLink
            to="/teacher/students"
            icon={<Users className="h-5 w-5" />}
            label="Estudiantes"
            isActive={isActive("/teacher/students")}
          />
          <SidebarNavLink
            to="/teacher/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Configuración"
            isActive={isActive("/teacher/settings")}
          />
        </ul>
      </nav>
      <SidebarFooter />
    </aside>
  );
}
