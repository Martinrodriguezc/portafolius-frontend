import { useProfilePage } from "../../hooks/profile/useProfilePage";
import { User, Bell, Shield } from "lucide-react";
import { PersonalTab } from "../../components/student/profile/PersonalTab";
import { NotificationsTab } from "../../components/student/profile/NotificationsTab";
import { SecurityTab } from "../../components/student/profile/SecurityTab";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";

export default function ProfilePage() {
  const { profile, setProfile, notifications, handleNotificationChange } =
    useProfilePage();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Perfil</h1>
        <p className="text-[#A0A0A0]">
          Gestiona tu información personal y preferencias
        </p>
      </header>

      <TabsContainer defaultValue="personal">
        <TabsList className="mb-6">
          <TabsButton value="personal">
            <User className="mr-2 h-4 w-4" />
            Información Personal
          </TabsButton>
          <TabsButton value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </TabsButton>
          <TabsButton value="security">
            <Shield className="mr-2 h-4 w-4" />
            Seguridad
          </TabsButton>
        </TabsList>

        <TabsPanel value="personal">
          <PersonalTab profile={profile} setProfile={setProfile} />
        </TabsPanel>
        <TabsPanel value="notifications">
          <NotificationsTab
            notifications={notifications}
            handleNotificationChange={handleNotificationChange}
          />
        </TabsPanel>
        <TabsPanel value="security">
          <SecurityTab />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}
