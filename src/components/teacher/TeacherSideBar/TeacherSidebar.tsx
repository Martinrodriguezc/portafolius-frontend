import { CheckSquare, Home, Settings, Users } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavLink } from "./SidebarNavlink";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom";
import { isActive } from "./utils/teacherSidebarUtils";

export default function TeacherSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <SidebarHeader />
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <SidebarNavLink
            to="/teacher"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            isActive={isActive(location.pathname, "/teacher", true)}
          />
          <SidebarNavLink
            to="/teacher/evaluations"
            icon={<CheckSquare className="h-5 w-5" />}
            label="Evaluaciones"
            isActive={isActive(location.pathname, "/teacher/evaluations", true)}
          />
          <SidebarNavLink
            to="/teacher/students"
            icon={<Users className="h-5 w-5" />}
            label="Estudiantes"
            isActive={isActive(location.pathname, "/teacher/students", true)}
          />
          <SidebarNavLink
            to="/teacher/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Configuración"
            isActive={isActive(location.pathname, "/teacher/settings", true)}
          />
        </ul>
      </nav>
      <SidebarFooter />
    </aside>
  );
}
