export const organOptions = ["Corazón", "Hígado", "Riñón", "Pulmón", "Vesícula"];

export const structureOptions: Record<string, string[]> = {
  Corazón: ["Vena aorta", "Válvula mitral", "Ventrículo izquierdo", "Ventrículo derecho", "Aurícula"],
  Hígado: ["Lóbulo derecho", "Lóbulo izquierdo", "Vena porta", "Conductos biliares"],
  Riñón: ["Corteza", "Médula", "Pelvis renal", "Uréter"],
  Pulmón: ["Lóbulo superior", "Lóbulo inferior", "Pleura", "Bronquios"],
  Vesícula: ["Cuello", "Cuerpo", "Fondo", "Conducto cístico"],
};

export const conditionOptions: Record<string, string[]> = {
  "Vena aorta": ["Aneurisma", "Disección", "Estenosis", "Normal"],
  "Válvula mitral": ["Estenosis", "Insuficiencia", "Prolapso", "Normal"],
  "Lóbulo derecho": ["Esteatosis", "Quiste", "Hemangioma", "Normal"],
  Corteza: ["Quiste", "Cálculo", "Hidronefrosis", "Normal"],
};

export const VIDEO_DATA_EXAMPLE = {
  title: "Ecografía abdominal",
  date: "12 mayo, 2023",
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
};