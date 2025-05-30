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

const CARDIACO_LEVELS_0_5: RubricLevel[] = [
  { value: 0, shortLabel: "0", longDescription: "Not obtained" },
  { value: 1, shortLabel: "1", longDescription: "Image quality too poor to permit meaningful interpretation" },
  { value: 2, shortLabel: "2", longDescription: "Suboptimal image quality, but basic interpretation possible" },
  { value: 3, shortLabel: "3", longDescription: "Adequate image quality for meaningful interpretation" },
  { value: 4, shortLabel: "4", longDescription: "Good image quality, meaningful image interpretation easy" },
  { value: 5, shortLabel: "5", longDescription: "Excellent image quality, interpretation straightforward" },
];

const CARDIACO_SECTIONS = [
  {
    key: "adq",
    name: "Image Generation",
    items: ["PSL", "PSS", "A4C", "SC", "IVC"].map<RubricItem>((k) => ({
      key: k,
      label: {
        PSL: "Parasternal Longitudinal",
        PSS: "Parasternal Short",
        A4C: "Apical 4C",
        SC: "Subcostal",
        IVC: "Inferior Vena Cava",
      }[k]!,
      levels: CARDIACO_LEVELS_0_5,
    })),
  },
  {
    key: "int",
    name: "Overall Quality",
    items: ["LV", "RV", "Volume", "Peric"].map<RubricItem>((k) => ({
      key: k,
      label: {
        LV: "LV Function",
        RV: "RV Function",
        Volume: "Volume Status",
        Peric: "Pericardium",
      }[k]!,
      levels: [
        { value: 0, shortLabel: "0", longDescription: "Image quality does not permit meaningful interpretation" },
        { value: 1, shortLabel: "1", longDescription: "Image quality permits meaningful interpretation" },
      ],
    })),
  },
];

export const RUBRICS: Record<string, ProtocolRubric> = {
  cardiaco: {
    key: "cardiaco",
    name: "Cardíaco",
    sections: CARDIACO_SECTIONS,
    totalStudyMaxScore: 25 + 4,
  },
  fate:   { key: "fate",   name: "FATE",   sections: CARDIACO_SECTIONS, totalStudyMaxScore: 29 },
  fast:   { key: "fast",   name: "FAST",   sections: CARDIACO_SECTIONS, totalStudyMaxScore: 29 },
  rush:   { key: "rush",   name: "RUSH",   sections: CARDIACO_SECTIONS, totalStudyMaxScore: 29 },
  blue:   { key: "blue",   name: "BLUE",   sections: CARDIACO_SECTIONS, totalStudyMaxScore: 29 },
  focus:  { key: "focus",  name: "FOCUS",  sections: CARDIACO_SECTIONS, totalStudyMaxScore: 29 },
};
