import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSideBar/AdminSidebar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
        <Outlet />
      </main>
    </div>
  );
} 