import { useState } from "react";
import { Menu, X } from "lucide-react";
import { StudentSidebarHeader } from "./StudentSidebarHeader";
import { StudentSidebarNavLink } from "./StudentSidebarNavLink";
import { StudentSidebarFooter } from "./StudentSidebarFooter";
import { studentMenuItems } from "./utils/studentSidebarUtils";

export default function StudentSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa en móvil */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="p-2 bg-white rounded shadow"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-[#F4F4F4] h-screen flex flex-col
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        {/* Botón cerrar en móvil */}
        <div className="md:hidden flex justify-end p-2">
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <StudentSidebarHeader />

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {studentMenuItems.map((item) => (
              <StudentSidebarNavLink
                key={item.path}
                to={item.path}
                icon={<item.icon className="h-5 w-5" />}
                label={item.label}
              />
            ))}
          </ul>
        </nav>

        <StudentSidebarFooter />
      </aside>
    </>
  );
}
