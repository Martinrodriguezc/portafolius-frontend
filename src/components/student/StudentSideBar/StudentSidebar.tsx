"use client"

import React from "react"
import StudentSidebarHeader from "./SidebarHeader"
import StudentSidebarFooter from "./SidebarFooter"
import StudentSidebarNavLink from "./SidebarNavLink"
import { Home, Upload, BarChart, BookOpen } from "lucide-react"

export default function StudentSidebar() {
  const menuItems = [
    { path: "/student", icon: Home, label: "Inicio" },
    { path: "/student/upload", icon: Upload, label: "Subir examen" },
    { path: "/student/progress", icon: BarChart, label: "Mi progreso" },
    { path: "/student/materials", icon: BookOpen, label: "Material de estudio" },
  ]

  return (
    <div className="w-64 bg-[#F4F4F4] h-screen flex flex-col">
      <StudentSidebarHeader />

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <StudentSidebarNavLink
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>
      </nav>

      <StudentSidebarFooter />
    </div>
  )
}