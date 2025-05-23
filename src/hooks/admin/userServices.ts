import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, UserFormData } from '../../types/Admin/UserTypes';
import { ServiceResponse } from '../../types/Admin/ServiceTypes';
import { config } from '../../config/config';
import { checkAdminStatus } from './adminCheck';

export const useUserServices = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.SERVER_URL}/users`);
      const allUsers = response.data;
      
      const studentsList = allUsers.filter((user: User) => 
        user.role === 'estudiante'
      );
      const teachersList = allUsers.filter((user: User) => 
        user.role === 'profesor' || user.role === 'admin'
      );
      
      setStudents(studentsList);
      setTeachers(teachersList);
    } catch (err) {
      setError('Error al obtener los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const addUser = async (newUser: Omit<UserFormData, 'id' | 'createdAt'>): Promise<ServiceResponse<User>> => {
    try {
      const adminCheck = checkAdminStatus();
      if (!adminCheck.isAdmin) {
        return { success: false, error: adminCheck.error };
      }
      
      const payload = {
        user: adminCheck.currentUser,
        newUser: newUser
      };
      
      const response = await axios.post(`${config.SERVER_URL}/users/admin/create`, payload);
      const createdUser = response.data as User;
      
      if (newUser.role === 'estudiante') {
        setStudents(prev => [...prev, createdUser]);
      } else if (newUser.role === 'profesor') {
        setTeachers(prev => [...prev, createdUser]);
      } else if (newUser.role === 'admin') {
        setTeachers(prev => [...prev, createdUser]);
      }
      
      return { success: true, data: createdUser };
    } catch (err) {
      setError('Error al añadir usuario');
      console.error(err);
      return { success: false, error: 'Error al añadir usuario' };
    }
  };

  const updateUser = async (id: string, userData: Partial<UserFormData>): Promise<ServiceResponse<User>> => {
    try {
      const response = await axios.put(`${config.SERVER_URL}/users/${id}`, userData);
      const updatedUser = response.data as User;
      
      const isStudent = 
        userData.role === 'estudiante' || 
        userData.role === 'student' || 
        (!userData.role && (updatedUser.role === 'estudiante' || updatedUser.role === 'student'));
      
      const isTeacher = 
        userData.role === 'profesor' || 
        userData.role === 'teacher' || 
        (!userData.role && (updatedUser.role === 'profesor' || updatedUser.role === 'teacher'));
      
      if (isStudent) {
        setStudents(prev => prev.map(user => user.id === id ? updatedUser : user));
        setTeachers(prev => prev.filter(user => user.id !== id));
      } else if (isTeacher) {
        setTeachers(prev => prev.map(user => user.id === id ? updatedUser : user));
        setStudents(prev => prev.filter(user => user.id !== id));
      }
      
      return { success: true, data: updatedUser };
    } catch (err) {
      setError('Error al actualizar usuario');
      console.error(err);
      return { success: false, error: 'Error al actualizar usuario' };
    }
  };

  const deleteUser = async (id: string, role: string): Promise<ServiceResponse> => {
    try {
      await axios.delete(`${config.SERVER_URL}/users/${id}`);
      
      const isStudent = role === 'estudiante' || role === 'student';
      const isTeacher = role === 'profesor' || role === 'teacher';
      
      if (isStudent) {
        setStudents(prev => prev.filter(user => user.id !== id));
      } else if (isTeacher) {
        setTeachers(prev => prev.filter(user => user.id !== id));
      }
      
      return { success: true };
    } catch (err) {
      setError('Error al eliminar usuario');
      console.error(err);
      return { success: false, error: 'Error al eliminar usuario' };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    students,
    teachers,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
}; 