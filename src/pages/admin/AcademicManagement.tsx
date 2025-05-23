import React from "react";
import { TeacherAssignment } from "../../components/admin/academicManagement/TeacherAssignment";
import { AssignmentsList } from "../../components/admin/academicManagement/AssignmentsList";

export default function AcademicManagement(): React.ReactElement {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Gestión Académica
          </h1>
          <p className="text-gray-500">Administra la asignación de profesores a estudiantes</p>
        </div>
        
        <TeacherAssignment />
        <AssignmentsList />
      </div>
    </div>
  );
} 