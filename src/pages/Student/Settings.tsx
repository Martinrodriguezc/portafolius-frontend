import { User } from "lucide-react";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import ProfileForm from "../../components/teacher/Settings/ProfileForm";
import { useUserProfile } from "../../hooks/user/UserProfile/useUserProfile";

export default function StudentSettingsLayout() {
  const {
    profile: user,
    loading: userLoading,
    error: userError,
    updateProfile,
  } = useUserProfile();

  if (userLoading) return <p className="p-8">Cargando perfil…</p>;
  if (userError)   return <p className="p-8 text-red-500">Error: {userError}</p>;
  if (!user)       return <p className="p-8 text-red-500">Usuario no encontrado</p>;

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Perfil</h1>
        <p className="text-[#A0A0A0]">Actualiza tus datos personales</p>
      </header>

      <TabsContainer defaultValue="profile">
        <TabsList className="mb-6">
          <TabsButton value="profile">
            <User className="mr-2 h-4 w-4" /> Perfil
          </TabsButton>
        </TabsList>

        <TabsPanel value="profile">
          <ProfileForm profile={user} onSave={updateProfile} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const StudentSettingsPage = () => <StudentSettingsLayout />;