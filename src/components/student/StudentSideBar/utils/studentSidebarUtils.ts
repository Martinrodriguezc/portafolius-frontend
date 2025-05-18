import { Home, Upload, BarChart, BookOpen, Video, Book, Settings } from "lucide-react";

export const studentMenuItems = [
  { path: "/student", icon: Home, label: "Inicio" },
  { path: "/student/create_study", icon: Book, label: "Crear Estudio" },
  { path: "/student/upload", icon: Upload, label: "Subir video" },
  { path: "/student/progress", icon: BarChart, label: "Mi progreso" },
  { path: "/student/studies", icon: Video, label: "Mis Estudios" },
  { path: "/student/materials", icon: BookOpen, label: "Material de estudio" },
  { path: "/student/settings", icon: Settings, label: "Configuración" },
];

export const isActivePath = (
  currentPath: string,
  itemPath: string
): boolean => {
  return currentPath === itemPath;
};
