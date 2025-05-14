import React from "react";
import { UserList } from "../../components/admin/userManagement";

export default function UserManagement(): React.ReactElement {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-500">Administra los usuarios de la plataforma</p>
      </div>
      
      <UserList />
    </div>
  );
} 