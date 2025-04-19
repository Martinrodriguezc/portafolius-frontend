/** Tipo base para vídeos en dashboard de profesor */
export interface Video {
  id: number;
  title: string;
  date: string;
  student: string;
  diagnosis: string;
  status: string; // "pendiente" | "evaluado"
}

/** Filtra vídeos según su estado */
export function filterVideosByStatus(status: string, videos: Video[]): Video[] {
  return videos.filter((v) => v.status === status);
}

/** Muestra datos ejemplo de vídeo clínico */
export const sampleVideoData: Video[] = [
  { id: 1, title: "Ecografía abdominal", date: "12 mayo, 2023", student: "Carlos Rodríguez", diagnosis: "Normal", status: "pendiente" },
  { id: 2, title: "Ecografía cardíaca", date: "5 mayo, 2023", student: "Ana Martínez", diagnosis: "Anormal", status: "pendiente" },
  { id: 3, title: "Ecografía obstétrica", date: "28 abril, 2023", student: "Laura Sánchez", diagnosis: "No concluyente", status: "evaluado" },
];

/** Interfaz de estudiante para listado */
export interface Student {
  id: number;
  name: string;
  email: string;
  institution: string;
  specialty: string;
  year: string;
  studies: number;
  averageScore: number;
  lastActivity: string;
  status: "active" | "inactive";
}

/** Datos de ejemplo de estudiantes */
export const sampleStudentsData: Student[] = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos.rodriguez@ejemplo.com",
    institution: "Universidad Médica Nacional", specialty: "Medicina de Emergencias",
    year: "3er año", studies: 24, averageScore: 7.8, lastActivity: "Hace 2 días", status: "active" },
  { id: 2, name: "Ana Martínez", email: "ana.martinez@ejemplo.com",
    institution: "Hospital Universitario Central", specialty: "Radiología",
    year: "2do año", studies: 18, averageScore: 8.2, lastActivity: "Hace 1 día", status: "active" },
  { id: 3, name: "Miguel Sánchez", email: "miguel.sanchez@ejemplo.com",
    institution: "Universidad Médica Nacional", specialty: "Medicina Interna",
    year: "4to año", studies: 32, averageScore: 7.5, lastActivity: "Hace 5 días", status: "active" },
  { id: 4, name: "Laura González", email: "laura.gonzalez@ejemplo.com",
    institution: "Hospital General", specialty: "Cardiología",
    year: "1er año", studies: 12, averageScore: 8.0, lastActivity: "Hoy", status: "active" },
  { id: 5, name: "Javier López", email: "javier.lopez@ejemplo.com",
    institution: "Universidad Médica Nacional", specialty: "Medicina de Emergencias",
    year: "3er año", studies: 20, averageScore: 6.9, lastActivity: "Hace 10 días", status: "inactive" },
];

/** Interfaz para evaluaciones completadas */
export interface Evaluation {
  id: number;
  student: string;
  protocol: string;
  date: string;
  score: number;
  status: "completed";
  videos: number;
  tags: string[];
}

/** Evaluaciones completadas de ejemplo */
export const sampleEvaluationData: Evaluation[] = [
  {
    id: 1,
    student: "Carlos Rodríguez",
    protocol: "FATE",
    date: "15 junio, 2023",
    score: 8.5,
    status: "completed",
    videos: 6,
    tags: ["Corazón", "Vena aorta", "Normal"],
  },
  {
    id: 2,
    student: "Ana Martínez",
    protocol: "FAST",
    date: "12 junio, 2023",
    score: 7.2,
    status: "completed",
    videos: 5,
    tags: ["Hígado", "Vesícula", "Quiste"],
  },
  {
    id: 3,
    student: "Miguel Sánchez",
    protocol: "RUSH",
    date: "10 junio, 2023",
    score: 6.8,
    status: "completed",
    videos: 8,
    tags: ["Corazón", "Pulmón", "Derrame"],
  },
  {
    id: 4,
    student: "Laura González",
    protocol: "FATE",
    date: "8 junio, 2023",
    score: 9.0,
    status: "completed",
    videos: 4,
    tags: ["Corazón", "Válvula mitral", "Prolapso"],
  },
  {
    id: 5,
    student: "Javier López",
    protocol: "FAST",
    date: "5 junio, 2023",
    score: 7.5,
    status: "completed",
    videos: 6,
    tags: ["Riñón", "Corteza", "Hidronefrosis"],
  },
];

/** Interfaz para evaluaciones pendientes */
export interface PendingEvaluation {
  id: number;
  student: string;
  protocol: string;
  date: string;
  videos: number;
  tags: string[];
}

/** Evaluaciones pendientes de ejemplo */
export const samplePendingEvaluationsData: PendingEvaluation[] = [
  {
    id: 101,
    student: "Elena Pérez",
    protocol: "FATE",
    date: "18 junio, 2023",
    videos: 5,
    tags: ["Corazón", "Ventrículo izquierdo"],
  },
  {
    id: 102,
    student: "Roberto Díaz",
    protocol: "RUSH",
    date: "17 junio, 2023",
    videos: 7,
    tags: ["Pulmón", "Pleura"],
  },
];