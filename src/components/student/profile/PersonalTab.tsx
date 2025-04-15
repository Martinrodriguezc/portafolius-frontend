import Button from "../../common/Button/Button";
import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";
import { Label } from "../../common/Label/Label";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  specialty: string;
  year: string;
  avatar: string;
}

interface PersonalTabProps {
  profile: ProfileData;
  setProfile: (val: ProfileData) => void;
}

export function PersonalTab({ profile, setProfile }: PersonalTabProps) {
  return (
    <Card className="rounded-[16px] p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-[#F4F4F4] flex items-center justify-center mb-4 overflow-hidden">
            <img src={profile.avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <Button variant="outline" className="w-full">
            Cambiar foto
          </Button>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[14px] text-[#333333]">Nombre</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[14px] text-[#333333]">Apellido</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[14px] text-[#333333]">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution" className="text-[14px] text-[#333333]">Institución</Label>
            <Input
              id="institution"
              value={profile.institution}
              onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
              className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-[14px] text-[#333333]">Especialidad</Label>
              <Input
                id="specialty"
                value={profile.specialty}
                onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-[14px] text-[#333333]">Año académico</Label>
              <Input
                id="year"
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}