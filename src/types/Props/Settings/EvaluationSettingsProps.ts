export interface EvaluationSettingsProps {
  evaluationSettings: {
    evaluationTemplate: string;
    minScore: number;
    maxVideosPerDay: number;
    autoPublish: boolean;
  };
  onSettingChange: <
    K extends keyof EvaluationSettingsProps["evaluationSettings"]
  >(
    key: K,
    value: EvaluationSettingsProps["evaluationSettings"][K]
  ) => void;
}
