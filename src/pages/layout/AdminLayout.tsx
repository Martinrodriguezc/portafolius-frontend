import React from "react";
import { Outlet } from "react-router-dom";
import { AdminModeProvider } from "../../contexts/AdminModeContext";
import UnifiedSidebar from "../../components/admin/AdminSideBar/UnifiedSidebar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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