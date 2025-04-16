import { User, Settings, FileText } from "lucide-react";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import TeacherLayout from "../layout/TeacherLayout";
import ProfileForm from "../../components/teacher/Settings/ProfileForm";
import PlatformSettings from "../../components/teacher/Settings/PlatformSettings";
import EvaluationSettings from "../../components/teacher/Settings/EvaluationSettings";
import { useTeacherSettings } from "../../hooks/teacher/useTeacherSettings";

export default function TeacherSettingsLayout() {
  const {
    profile,
    platformSettings,
    evaluationSettings,
    handleProfileChange,
    handlePlatformSettingsChange,
    handleEvaluationSettingsChange,
  } = useTeacherSettings();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Configuración</h1>
        <p className="text-[#A0A0A0]">
          Gestiona tu perfil y preferencias de la plataforma
        </p>
      </header>

      <TabsContainer defaultValue="profile">
        <TabsList className="mb-6">
          <TabsButton value="profile">
            <User className="mr-2 h-4 w-4" /> Perfil
          </TabsButton>
          <TabsButton value="platform">
            <Settings className="mr-2 h-4 w-4" /> Plataforma
          </TabsButton>
          <TabsButton value="evaluation">
            <FileText className="mr-2 h-4 w-4" /> Evaluación
          </TabsButton>
        </TabsList>

        <TabsPanel value="profile">
          <ProfileForm
            profile={profile}
            onProfileChange={handleProfileChange}
          />
        </TabsPanel>

        <TabsPanel value="platform">
          <PlatformSettings
            settings={platformSettings}
            onSettingChange={handlePlatformSettingsChange}
          />
        </TabsPanel>

        <TabsPanel value="evaluation">
          <EvaluationSettings
            evaluationSettings={evaluationSettings}
            onSettingChange={handleEvaluationSettingsChange}
          />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const TeacherSettingsPage = () => (
  <TeacherLayout>
    <TeacherSettingsLayout />
  </TeacherLayout>
);
