import { Outlet } from "react-router-dom";
import TeacherSidebar from "../../components/teacher/TeacherSideBar/TeacherSidebar";
import type { TeacherLayoutProps } from "../../types/layout";

export default function TeacherLayout({ children }: TeacherLayoutProps) {
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