import { UserPlus, FileSpreadsheet, BookPlus, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Añadir Usuario",
      description: "Registrar un nuevo usuario en el sistema",
      icon: <UserPlus className="h-6 w-6 text-blue-500" />,
      link: "/admin/users?action=new",
      color: "bg-blue-50",
    },
    {
      title: "Generar Reporte",
      description: "Crear un nuevo reporte del sistema",
      icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
      link: "/admin/reports/new",
      color: "bg-green-50",
    },
    {
      title: "Añadir Curso",
      description: "Crear un nuevo curso en la plataforma",
      icon: <BookPlus className="h-6 w-6 text-purple-500" />,
      link: "/admin/academic/courses/new",
      color: "bg-purple-50",
    },
    {
      title: "Configuración",
      description: "Ajustar parámetros del sistema",
      icon: <Settings className="h-6 w-6 text-gray-500" />,
      link: "/admin/settings",
      color: "bg-gray-50",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="flex flex-col rounded-lg border bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className={`rounded-md ${action.color} p-2 self-start`}>
              {action.icon}
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">{action.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}; 