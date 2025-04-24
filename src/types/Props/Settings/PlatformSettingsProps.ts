export interface PlatformSettingsProps {
  settings: {
    autoAssign: boolean;
    notifyNewStudies: boolean;
    showScores: boolean;
    allowComments: boolean;
    defaultProtocol: string;
  };
  onSettingChange: <K extends keyof PlatformSettingsProps["settings"]>(
    key: K,
    value: PlatformSettingsProps["settings"][K]
  ) => void;
}
