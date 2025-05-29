import { useState } from 'react';
import { useAdminMaterials, useCreateMaterial, useUpdateMaterial, useDeleteMaterial } from '../../hooks/admin/Materials/useAdminMaterials';
import { Material } from '../../types/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../hooks/auth/authServices';

import MaterialsHeader from '../../components/admin/materials/MaterialsHeader';
import MaterialsSearchFilter from '../../components/admin/materials/MaterialsSearchFilter';
import MaterialsSummary from '../../components/admin/materials/MaterialsSummary';
import MaterialsTabs from '../../components/admin/materials/MaterialsTabs';
import MaterialForm from '../../components/admin/materials/MaterialForm';
import MaterialsLoading from '../../components/admin/materials/MaterialsLoading';
import MaterialsError from '../../components/admin/materials/MaterialsError';
import MaterialsAuthError from '../../components/admin/materials/MaterialsAuthError';

interface ErrorWithResponse {
  response?: {
    status: number;
  };
  message?: string;
}

export default function MaterialsManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  
  // Obtener los materiales usando el hook (ahora el filtrado por tipo se hace en el hook)
  const { 
    data: materials, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useAdminMaterials(selectedType);
  
  // Mutaciones para crear, actualizar y eliminar materiales
  const createMutation = useCreateMaterial();
  const updateMutation = useUpdateMaterial();
  const deleteMutation = useDeleteMaterial();

  // Estado de carga para el formulario
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Verificar si hay un error de autenticación/autorización
  const getAuthError = (error: ErrorWithResponse) => {
    if (!error) return false;
    
    // Verificar errores de autorización comunes
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Si el token es inválido, redirigir al login
        authService.logout();
        navigate('/login');
        return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      }
      
      if (status === 403) {
        return "No tienes permisos para acceder a la gestión de materiales. Esta sección está reservada para administradores y profesores.";
      }
    }
    
    // Verificar errores específicos de token
    if (error.message && (
      error.message.includes("token") || 
      error.message.includes("autenticación") ||
      error.message.includes("sesión")
    )) {
      return error.message;
    }
    
    return false;
  };
  
  const authErrorMessage = getAuthError(error as ErrorWithResponse);
  
  // Filtrar los materiales por término de búsqueda
  const filteredMaterials = materials?.filter(material => {
    const searchLower = searchTerm.toLowerCase();
    
    return (
      material.title.toLowerCase().includes(searchLower) ||
      material.description.toLowerCase().includes(searchLower)
    );
  }) || [];

  // Manejadores de eventos
  const handleAddMaterial = () => {
    setEditingMaterial(null);
    setIsFormOpen(true);
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setIsFormOpen(true);
  };

  const handleDeleteMaterial = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este material? Esta acción no se puede deshacer.')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        // Verificar si es un error de autenticación
        const authError = getAuthError(error as ErrorWithResponse);
        if (authError) {
          alert(`Error de autorización: ${authError}`);
        } else {
          alert(`Error al eliminar el material: ${(error as Error).message || 'Error desconocido'}`);
        }
      }
    }
  };

  const handleFormSubmit = async (materialData: Partial<Material>) => {
    try {
      if (editingMaterial) {
        // Actualizar material existente
        await updateMutation.mutateAsync({ 
          id: editingMaterial.id, 
          material: materialData 
        });
      } else {
        // Crear nuevo material
        await createMutation.mutateAsync(materialData);
      }
      
      setIsFormOpen(false);
      setEditingMaterial(null);
    } catch (error) {
      // Verificar si es un error de autenticación
      const authError = getAuthError(error as ErrorWithResponse);
      if (authError) {
        alert(`Error de autorización: ${authError}`);
      } else {
        alert(`Error al guardar el material: ${(error as Error).message || 'Error desconocido'}`);
      }
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingMaterial(null);
  };

  // Si está cargando, mostrar el componente de carga
  if (isLoading) {
    return <MaterialsLoading />;
  }

  // Si hay un error de autenticación, mostrar el componente de error de autenticación
  if (authErrorMessage) {
    return <MaterialsAuthError message={authErrorMessage} />;
  }

  // Si hay un error, mostrar el componente de error
  if (isError) {
    return <MaterialsError onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <MaterialsHeader onAddMaterial={handleAddMaterial} />
      
      <MaterialsSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      
      {materials && materials.length > 0 && (
        <MaterialsSummary materials={materials} />
      )}
      
      <MaterialsTabs 
        materials={filteredMaterials}
        onEdit={handleEditMaterial}
        onDelete={handleDeleteMaterial}
      />
      
      {isFormOpen && (
        <MaterialForm
          material={editingMaterial || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
} 