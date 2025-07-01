import { Outlet } from "react-router-dom";
import TeacherSidebar from "../../components/teacher/TeacherSideBar/TeacherSidebar";
import type { TeacherLayoutProps } from "../../types/layout";
import { useTeacherAuthorization } from "../../hooks/auth/useTeacherAuthorization";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { AdminModeProvider } from "../../contexts/AdminModeContext";
import UnifiedSidebar from "../../components/admin/AdminSideBar/UnifiedSidebar";

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  // Usar el hook de autorización para validar que el profesor esté autorizado
  useTeacherAuthorization();
  
  const user = useCurrentUser();
  const isAdmin = user?.role === 'admin';

  // Si es admin, usar el layout con contexto de admin y sidebar unificado
  if (isAdmin) {
    return (
      <AdminModeProvider>
        <div className="flex h-screen bg-gray-50">
          <UnifiedSidebar />
          <main className="flex-1 overflow-auto">
            {children}
            <Outlet />
          </main>
        </div>
      </AdminModeProvider>
    );
  }

  // Si es profesor normal, usar el layout original
  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-auto">
        {children}
        <Outlet />
      </main>
    </div>
  );
}