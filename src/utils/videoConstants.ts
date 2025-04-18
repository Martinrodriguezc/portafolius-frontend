export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  tags: { id: number; text: string; author: "student" | "teacher" }[];
  comments: { id: number; text: string; author: string; date: string }[];
}

export const evaluatedVideos: Video[] = [
  {
    id: "1",
    title: "Ecografía de la Vena Aorta",
    description: "Video tutorial sobre la correcta visualización de la vena aorta",
    date: "20 abril, 2023",
    duration: "12:45",
    tags: [
      { id: 1, text: "Hígado", author: "student" },
      { id: 2, text: "Vesícula biliar", author: "student" },
      { id: 3, text: "Orientación incorrecta", author: "teacher" },
    ],
    comments: [
      {
        id: 1,
        text: "Se observa correctamente el hígado, pero la orientación del transductor no es la adecuada.",
        author: "Dr. García",
        date: "13 mayo, 2023, 14:30",
      },
      {
        id: 2,
        text: "Gracias por la observación. Intentaré mejorar la orientación en el próximo estudio.",
        author: "Carlos Rodríguez",
        date: "13 mayo, 2023, 15:45",
      },
    ],
  },
  {
    id: "2",
    title: "Identificación de Patologías Cardíacas",
    description: "Casos clínicos con diferentes patologías cardíacas",
    date: "15 marzo, 2023",
    duration: "18:30",
    tags: [
      { id: 4, text: "Ventricular", author: "student" },
      { id: 5, text: "Dilatación", author: "teacher" },
    ],
    comments: [
      {
        id: 3,
        text: "Buen barrido, ojo al ángulo de insonación.",
        author: "Dr. Pérez",
        date: "16 marzo, 2023, 10:15",
      },
    ],
  },
];

export const pendingVideos: Video[] = [
  {
    id: "3",
    title: "Técnica de Barrido Abdominal",
    description: "Demostración de la técnica correcta para el barrido abdominal",
    date: "10 febrero, 2023",
    duration: "09:15",
    tags: [],
    comments: [],
  },
  {
    id: "4",
    title: "Protocolo FAST Avanzado",
    description: "Guía paso a paso del protocolo FAST en situaciones complejas",
    date: "05 enero, 2023",
    duration: "14:20",
    tags: [],
    comments: [],
  },
];