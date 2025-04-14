"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"

export default function StudentSidebarFooter() {
  return (
    <div className="p-4 border-t border-[#E0E0E0]">
      <Link
        href="/"
        className="flex items-center px-4 py-2 rounded-md text-[#333333] hover:bg-white/50"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Cerrar Sesión
      </Link>
    </div>
  )
}