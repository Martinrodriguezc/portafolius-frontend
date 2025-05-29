import React from "react";
import { Link } from "react-router-dom";
import { UserCheck } from "lucide-react";
import { UserList } from "../../components/admin/userManagement";

export default function UserManagement(): React.ReactElement {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-500">Administra los usuarios de la plataforma</p>
        </div>
        
        <Link
          to="/admin/pending-teachers"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
        >
          <UserCheck className="h-5 w-5" />
          Profesores Pendientes
        </Link>
      </div>
      
      <UserList />
    </div>
  );
} 