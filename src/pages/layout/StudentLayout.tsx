import type { ReactNode } from "react";
import StudentSidebar from "../../components/student/StudentSideBar/StudentSidebar";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="flex h-screen bg-[#FAFAFB]">
      <StudentSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}