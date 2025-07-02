import { useState } from "react";
import { 
  CheckSquare, 
  Home, 
  Settings, 
  Users, 
  FileText, 
  Menu, 
  X,
  BarChart,
  BookOpen,
  Files
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAdminMode } from "../../../contexts/AdminModeContextUtils";
import { SidebarNavLink } from "./SidebarNavlink";
import { SidebarFooter } from "./SidebarFooter";
import { UnifiedSidebarHeader } from "./UnifiedSidebarHeader";
import { isActive } from "./utils/adminSidebarUtils";
import { isActive as isActiveTeacher } from "../../teacher/TeacherSideBar/utils/teacherSidebarUtils";

export default function UnifiedSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { currentViewRole } = useAdminMode();

  const adminNavItems = [
    {
      to: "/admin",
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      isActive: isActive(location.pathname, "/admin", true)
    },
    {
      to: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      label: "Gestión de Usuarios",
      isActive: isActive(location.pathname, "/admin/users", true)
    },
    {
      to: "/admin/academic",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Gestión Académica",
      isActive: isActive(location.pathname, "/admin/academic", true)
    },
    {
      to: "/admin/materials",
      icon: <Files className="h-5 w-5" />,
      label: "Gestión de Materiales",
      isActive: isActive(location.pathname, "/admin/materials", true)
    },
    
    {
      to: "/admin/reports",
      icon: <BarChart className="h-5 w-5" />,
      label: "Métricas y Reportes",
      isActive: isActive(location.pathname, "/admin/reports", true)
    },
    {
      to: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Configuración",
      isActive: isActive(location.pathname, "/admin/settings", true)
    }
  ];

  const teacherNavItems = [
    {
      to: "/teacher",
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      isActive: isActiveTeacher(location.pathname, "/teacher", true)
    },
    {
      to: "/teacher/evaluations",
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Evaluaciones",
      isActive: isActiveTeacher(location.pathname, "/teacher/evaluations", true)
    },
    {
      to: "/teacher/students",
      icon: <Users className="h-5 w-5" />,
      label: "Estudiantes",
      isActive: isActiveTeacher(location.pathname, "/teacher/students", true)
    },
    {
      to: "/teacher/materials",
      icon: <FileText className="h-5 w-5" />,
      label: "Subir Materiales",
      isActive: isActiveTeacher(location.pathname, "/teacher/materials", true)
    },
    {
      to: "/teacher/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Configuración",
      isActive: isActiveTeacher(location.pathname, "/teacher/settings", true)
    }
  ];

  const navItems = currentViewRole === 'teacher' ? teacherNavItems : adminNavItems;
  const isMobile = currentViewRole === 'teacher'; // Solo mostrar menú móvil en modo profesor

  return (
    <>
      {/* Botón de menú móvil (solo en modo profesor) */}
      {isMobile && (
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="p-2 bg-white rounded shadow"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Overlay para móvil */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-30' : ''} 
          w-64 bg-white border-r border-gray-200 h-screen flex flex-col
          ${isMobile ? `transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 md:flex md:flex-col` : ''}
        `}
      >
        {/* Botón cerrar móvil */}
        {isMobile && (
          <div className="md:hidden flex justify-end p-2">
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        <UnifiedSidebarHeader />

        <nav className={`flex-1 p-4 ${isMobile ? 'overflow-y-auto' : ''}`}>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={item.isActive}
              />
            ))}
          </ul>
        </nav>

        <SidebarFooter />
      </aside>
    </>
  );
} 