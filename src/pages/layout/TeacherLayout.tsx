import type { ReactNode } from "react"
import TeacherSidebar from "../../components/teacher/TeacherSidebar"


interface TeacherLayoutProps {
  children: ReactNode
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
