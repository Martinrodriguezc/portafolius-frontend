import React, { useState } from "react";
import EvaluationSettings from "../../components/teacher/Settings/EvaluationSettings";
import PlatformSettings from "../../components/teacher/Settings/PlatformSettings";
import ProfileForm from "../../components/teacher/Settings/ProfileForm";
import { UserProfileProps } from "../../types/Props/UserProfileProps";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import { User, Settings as SettingsIcon, FileText } from "lucide-react";

export default function Settings(): React.ReactElement {
  const [evaluationSettings, setEvaluationSettings] = useState({
    evaluationTemplate: "Plantilla estándar",
    minScore: 7,
    maxVideosPerDay: 10,
    autoPublish: false,
  });

  const [platformSettings, setPlatformSettings] = useState({
    autoAssign: false,
    notifyNewStudies: true,
    showScores: true,
    allowComments: true,
    defaultProtocol: "FATE",
  });

  const [profile, setProfile] = useState<UserProfileProps>({
    id: 1, // Este ID debería venir de la sesión del usuario actual
    first_name: "",
    last_name: "",
    email: "",
    role: "admin"
  });

  const handleEvaluationSettingChange = (setting: string, value: unknown) => {
    setEvaluationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handlePlatformSettingChange = (setting: string, value: unknown) => {
    setPlatformSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleProfileSave = async (updatedProfile: Partial<Omit<UserProfileProps, "id">>) => {
    // Aquí iría la lógica para guardar el perfil
    setProfile(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Configuración
          </h1>
          <p className="text-gray-500">Ajusta los parámetros del sistema</p>
        </div>
        
        <TabsContainer defaultValue="profile">
          <TabsList className="mb-6">
            <TabsButton value="profile">
              <User className="mr-2 h-4 w-4" /> Perfil
            </TabsButton>
            <TabsButton value="platform">
              <SettingsIcon className="mr-2 h-4 w-4" /> Plataforma
            </TabsButton>
            <TabsButton value="evaluation">
              <FileText className="mr-2 h-4 w-4" /> Evaluación
            </TabsButton>
          </TabsList>

          <TabsPanel value="profile">
            <ProfileForm 
              profile={profile}
              onSave={handleProfileSave}
            />
          </TabsPanel>

          <TabsPanel value="platform">
            <PlatformSettings
              settings={platformSettings}
              onSettingChange={handlePlatformSettingChange}
            />
          </TabsPanel>

          <TabsPanel value="evaluation">
            <EvaluationSettings
              evaluationSettings={evaluationSettings}
              onSettingChange={handleEvaluationSettingChange}
            />
          </TabsPanel>
        </TabsContainer>
      </div>
    </div>
  );
} 