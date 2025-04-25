import { Home, Upload, BarChart, BookOpen, Video } from "lucide-react";

export const studentMenuItems = [
  { path: "/student", icon: Home, label: "Inicio" },
  { path: "/student/upload", icon: Upload, label: "Subir examen" },
  { path: "/student/progress", icon: BarChart, label: "Mi progreso" },
  { path: "/student/studies", icon: Video, label: "Mis Estudios" },
  { path: "/student/materials", icon: BookOpen, label: "Material de estudio" },
];

export const isActivePath = (
  currentPath: string,
  itemPath: string
): boolean => {
  return currentPath === itemPath;
};
