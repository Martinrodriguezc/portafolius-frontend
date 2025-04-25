import { useState } from "react";
import {
  EvaluationSettingsType,
  PlatformSettingsType,
  TeacherProfile,
} from "../../../../types/Teacher";

export function useTeacherSettings() {
  const [profile, setProfile] = useState<TeacherProfile>({
    firstName: "Dr. Juan",
    lastName: "García",
    email: "juan.garcia@ejemplo.com",
    institution: "Universidad Médica Nacional",
    department: "Departamento de Radiología",
    specialty: "Radiología Intervencionista",
    bio: "Especialista en radiología con 15 años de experiencia. Profesor asociado y jefe del departamento de radiología intervencionista.",
    avatar: "/placeholder.svg?height=100&width=100",
  });

  const [platformSettings, setPlatformSettings] =
    useState<PlatformSettingsType>({
      autoAssign: true,
      notifyNewStudies: true,
      showScores: true,
      allowComments: true,
      defaultProtocol: "FATE",
    });

  const [evaluationSettings, setEvaluationSettings] =
    useState<EvaluationSettingsType>({
      evaluationTemplate: "Plantilla estándar",
      minScore: 6,
      maxVideosPerDay: 10,
      autoPublish: false,
    });

  const handleProfileChange = (key: keyof TeacherProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlatformSettingsChange = <K extends keyof PlatformSettingsType>(
    key: K,
    value: PlatformSettingsType[K]
  ) => {
    setPlatformSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleEvaluationSettingsChange = <
    K extends keyof EvaluationSettingsType
  >(
    key: K,
    value: EvaluationSettingsType[K]
  ) => {
    setEvaluationSettings((prev) => ({ ...prev, [key]: value }));
  };

  return {
    profile,
    platformSettings,
    evaluationSettings,
    handleProfileChange,
    handlePlatformSettingsChange,
    handleEvaluationSettingsChange,
  };
}
