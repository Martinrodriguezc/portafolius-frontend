import { BarChart, Home, Settings, Users, BookOpen, CheckSquare, Files, ShieldAlertIcon } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavLink } from "./SidebarNavlink";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom";
import { isActive } from "./utils/adminSidebarUtils";

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <SidebarHeader />
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <SidebarNavLink
            to="/admin"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            isActive={isActive(location.pathname, "/admin", true)}
          />
          <SidebarNavLink
            to="/admin/users"
            icon={<Users className="h-5 w-5" />}
            label="Gestión de Usuarios"
            isActive={isActive(location.pathname, "/admin/users", true)}
          />
          <SidebarNavLink
            to="/admin/academic"
            icon={<BookOpen className="h-5 w-5" />}
            label="Gestión Académica"
            isActive={isActive(location.pathname, "/admin/academic", true)}
          />
          <SidebarNavLink
            to="/admin/materials"
            icon={<Files className="h-5 w-5" />}
            label="Gestión de Materiales"
            isActive={isActive(location.pathname, "/admin/materials", true)}
          />
          <SidebarNavLink
            to="/admin/evaluations"
            icon={<CheckSquare className="h-5 w-5" />}
            label="Evaluaciones"
            isActive={isActive(location.pathname, "/admin/evaluations", true)}
          />
          <SidebarNavLink
            to="/admin/reports"
            icon={<BarChart className="h-5 w-5" />}
            label="Métricas y Reportes"
            isActive={isActive(location.pathname, "/admin/reports", true)}
          />
          <SidebarNavLink
            to="/admin/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Configuración"
            isActive={isActive(location.pathname, "/admin/settings", true)}
          />
          <SidebarNavLink
            to="/admin/Protocol"
            icon={<ShieldAlertIcon className="h-5 w-5" />}
            label="Protocolos"
            isActive={isActive(location.pathname, "/admin/Protocol", true)}
          />
        </ul>
      </nav>
      <SidebarFooter />
    </aside>
  );
} 