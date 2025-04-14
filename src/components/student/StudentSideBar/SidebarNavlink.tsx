"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface StudentSidebarNavLinkProps {
  path: string
  icon: React.ComponentType<any>
  label: string
}

export default function StudentSidebarNavLink({ path, icon: Icon, label }: StudentSidebarNavLinkProps) {
  const pathname = usePathname()

  const isActive = () => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive() ? "bg-white text-[#4E81BD]" : "text-[#333333] hover:bg-white/50"
        }`}
      >
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </Link>
    </li>
  )
}