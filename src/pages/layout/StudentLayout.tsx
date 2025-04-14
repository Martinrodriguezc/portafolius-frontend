import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/student/StudentSideBar/StudentSidebar";

export default function StudentLayout() {
  return (
    <div className="flex h-screen bg-[#FAFAFB]">
      <StudentSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}