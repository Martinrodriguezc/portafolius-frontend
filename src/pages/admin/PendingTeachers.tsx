import PendingTeachersTable from "../../components/admin/pendingTeachers/PendingTeachersTable";

export default function PendingTeachersPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Profesores Pendientes de Autorización
        </h1>
        <p className="text-gray-600">
          Gestiona las solicitudes de registro de nuevos profesores
        </p>
      </div>

      <PendingTeachersTable />
    </div>
  );
} 