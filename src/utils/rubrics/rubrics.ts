export interface RubricLevel {
  value: number;
  shortLabel: string;
  longDescription: string;
}

export interface RubricItem {
  key: string;
  label: string;
  levels: RubricLevel[];
}

export interface RubricSection {
  key: string;
  name: string;
  items: RubricItem[];
}

export interface ProtocolRubric {
  key: string;
  name: string;
  sections: RubricSection[];
  totalStudyMaxScore: number;
}

// ── 1) Escalas reutilizables ───────────────────────────────

// 0–5 para “Image Generation”
const LEVELS_0_5: RubricLevel[] = [
  { value: 0, shortLabel: "0", longDescription: "Not obtained" },
  { value: 1, shortLabel: "1", longDescription: "Image quality too poor to permit meaningful interpretation" },
  { value: 2, shortLabel: "2", longDescription: "Suboptimal image quality, but basic interpretation possible" },
  { value: 3, shortLabel: "3", longDescription: "Adequate image quality for meaningful interpretation" },
  { value: 4, shortLabel: "4", longDescription: "Good image quality, meaningful image interpretation easy" },
  { value: 5, shortLabel: "5", longDescription: "Excellent image quality, interpretation straightforward" },
];

// 0–1 para checkboxes y Overall Quality
const LEVELS_BINARY: RubricLevel[] = [
  { value: 0, shortLabel: "0", longDescription: "Not detected" },
  { value: 1, shortLabel: "1", longDescription: "Detected" },
];

// ── 2) CARDÍACO ────────────────────────────────────────────
const CARDIACO_SECTIONS: RubricSection[] = [
  {
    key: "adq",
    name: "Image Generation",
    items: ["PSL","PSS","A4C","SC","IVC"].map<RubricItem>(k => ({
      key: k,
      label: {
        PSL: "Parasternal Longitudinal",
        PSS: "Parasternal Short",
        A4C: "Apical 4C",
        SC:  "Subcostal",
        IVC: "Inferior Vena Cava",
      }[k]!,
      levels: LEVELS_0_5,
    })),
  },
  {
    key: "int",
    name: "Overall Quality",
    items: ["LV","RV","Volume","Peric"].map<RubricItem>(k => ({
      key: k,
      label: {
        LV:     "LV Function",
        RV:     "RV Function",
        Volume: "Volume Status",
        Peric:  "Pericardium",
      }[k]!,
      levels: LEVELS_BINARY,
    })),
  },
];

// ── 3) PULMÓN ──────────────────────────────────────────────
const PULMON_SECTIONS: RubricSection[] = [
  {
    key: "adq",
    name: "Image Generation",
    items: ["L1","L2","L3","L4","R1","R2","R3","R4"].map<RubricItem>(k => ({
      key:   k,
      label: k,
      levels: LEVELS_0_5,
    })),
  },
  {
    key: "int",
    name: "Image Interpretation",
    items: [
      "Neumotorax",
      "Síndrome Intersticial",
      "Consolidación",
      "Derrame Pleural",
    ].map<RubricItem>(k => ({
      key:   k,
      label: k,
      levels: LEVELS_BINARY,
    })),
  },
];

// ── 4) E-FAST (Checklist) ──────────────────────────────────
const EFAST_SECTIONS: RubricSection[] = [
  {
    key: "hepatorenal",
    name: "Hepatorenal Space",
    items: [
      "Orients image with the liver to the left and kidney to the right",
      "Adjusts depth so the image ends just below the kidney",
      "Sets gain appropriately",
      "Visualizes the interface between the liver and kidney clearly",
      "Sweeps through the entire kidney",
      "Visualizes the caudal tip of the liver clearly",
    ].map<RubricItem>((k,i) => ({ key: `hep_${i}`, label: k, levels: LEVELS_BINARY })),
  },
  {
    key: "splenorenal",
    name: "Splenorenal Space",
    items: [
      "Orients image with the spleen to the left and kidney to the right",
      "Adjusts depth so the image ends just below the kidney",
      "Sets gain appropriately",
      "Visualizes the interface between the spleen and kidney clearly",
      "Sweeps through the entire kidney",
      "Visualizes space between diaphragm and spleen",
    ].map<RubricItem>((k,i) => ({ key: `spl_${i}`, label: k, levels: LEVELS_BINARY })),
  },
  {
    key: "pelvis",
    name: "Pelvis",
    items: [
      "Adjusts depth so the image ends 4-5 cm below the bladder",
      "Sets gain such that the urine in the bladder appears black",
      "Visualizes the bladder in longitudinal section",
      "Scrolls through the entire bladder (longitudinal)",
      "Visualizes the bladder in transverse section",
      "Sweeps through the entire bladder (transverse)",
    ].map<RubricItem>((k,i) => ({ key: `pel_${i}`, label: k, levels: LEVELS_BINARY })),
  },
  {
    key: "pericardium",
    name: "Pericardium",
    items: [
      "Orients apex of ventricles towards right of image",
      "Adjusts depth past deepest layer of pericardium",
      "Sets gain such that blood appears black",
      "Optimizes view using adjuncts",
      "Visualizes anterior and posterior pericardium",
      "Sweeps through the entire heart",
    ].map<RubricItem>((k,i) => ({ key: `per_${i}`, label: k, levels: LEVELS_BINARY })),
  },
];

// ── 5) OTROS PROTOCOLOS (Ventanas 0–5) ────────────────────
const WINDOWS: Record<string,string[]> = {
  renal:            ["Riñón Derecho","Riñón Izquierdo","Vejiga"],
  vesicula:         ["Eje Largo","Eje Corto","Triada Portal"],
  aorta:            ["Aorta Torácica","Abdominal (Zona 1)","Abdominal (Zona 2)","Abdominal (Zona 3)"],
  tvp:              ["Safeno Femoral","VFS","VFC","Poplítea","Trifurcación"],
  ocular:           ["Ojo Derecho","Ojo Izquierdo"],
  "partes-blandas": ["Otra"],
  gastrointestinal: ["Obstrucción Intestinal","Ascitis","Neumoperitoneo"],
};
function makeVentanasSection(protocolKey: string): RubricSection {
  const wins = WINDOWS[protocolKey] || [];
  return {
    key:   "ventanas",
    name:  "Ventanas",
    items: wins.map<RubricItem>(w => ({ key: w, label: w, levels: LEVELS_0_5 })),
  };
}

// ── 6) Mapa final de rubricas ──────────────────────────────
export const RUBRICS: Record<string,ProtocolRubric> = {
  cardiaco: {
    key: "cardiaco",
    name: "Cardíaco",
    sections: CARDIACO_SECTIONS,
    totalStudyMaxScore: 5*5 + 4*1,
  },
  pulmon: {
    key: "pulmon",
    name: "Pulmón",
    sections: PULMON_SECTIONS,
    totalStudyMaxScore: 8*5 + 4*1,
  },
  "e-fast": {
    key: "e-fast",
    name: "E-FAST",
    sections: EFAST_SECTIONS,
    totalStudyMaxScore: EFAST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0),
  },
  renal: {
    key: "renal",
    name: "Renal",
    sections: [ makeVentanasSection("renal") ],
    totalStudyMaxScore: WINDOWS["renal"].length * 5,
  },
  vesicula: {
    key: "vesicula",
    name: "Vesícula",
    sections: [ makeVentanasSection("vesicula") ],
    totalStudyMaxScore: WINDOWS["vesicula"].length * 5,
  },
  aorta: {
    key: "aorta",
    name: "Aorta",
    sections: [ makeVentanasSection("aorta") ],
    totalStudyMaxScore: WINDOWS["aorta"].length * 5,
  },
  tvp: {
    key: "tvp",
    name: "TVP",
    sections: [ makeVentanasSection("tvp") ],
    totalStudyMaxScore: WINDOWS["tvp"].length * 5,
  },
  ocular: {
    key: "ocular",
    name: "Ocular",
    sections: [ makeVentanasSection("ocular") ],
    totalStudyMaxScore: WINDOWS["ocular"].length * 5,
  },
  "partes-blandas": {
    key: "partes-blandas",
    name: "Partes Blandas",
    sections: [ makeVentanasSection("partes-blandas") ],
    totalStudyMaxScore: WINDOWS["partes-blandas"].length * 5,
  },
  gastrointestinal: {
    key: "gastrointestinal",
    name: "Gastro Intestinal",
    sections: [ makeVentanasSection("gastrointestinal") ],
    totalStudyMaxScore: WINDOWS["gastrointestinal"].length * 5,
  },
};


