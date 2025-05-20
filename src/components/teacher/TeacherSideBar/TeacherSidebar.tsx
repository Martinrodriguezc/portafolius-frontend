import { useState } from "react";
import { CheckSquare, Home, Settings, Users, FileText, Menu, X } from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavLink } from "./SidebarNavlink";
import { SidebarFooter } from "./SidebarFooter";
import { useLocation } from "react-router-dom";
import { isActive } from "./utils/teacherSidebarUtils";

export default function TeacherSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="p-2 bg-white rounded shadow"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:flex-col
        `}
      >
        <div className="md:hidden flex justify-end p-2">
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SidebarHeader />

        <nav className="flex-1 p-4 overflow-y-auto">
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
              to="/teacher/materials"
              icon={<FileText className="h-5 w-5" />}
              label="Subir Materiales"
              isActive={isActive(location.pathname, "/teacher/materials", true)}
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
    </>
  );
}