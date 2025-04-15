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