import { Link, useLocation } from "react-router-dom"
import { Home, CheckSquare, Users, Settings, LogOut } from "lucide-react"

export default function TeacherSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-sky-900">PortafoliUS</h2>
        <p className="text-sm text-gray-500">Panel de Profesor</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/teacher"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/teacher") && !isActive("/teacher/students") && !isActive("/teacher/settings")
                  ? "bg-sky-100 text-sky-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/evaluations"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/teacher/evaluations") ? "bg-sky-100 text-sky-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CheckSquare className="mr-3 h-5 w-5" />
              Evaluaciones
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/students"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/teacher/students") ? "bg-sky-100 text-sky-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Estudiantes
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/settings"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/teacher/settings") ? "bg-sky-100 text-sky-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Configuración
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Link to="/" className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Link>
      </div>
    </div>
  )
}
