import React, { ChangeEvent } from "react";
import Button from "../../common/Button/Button";
import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";

interface ProfileFormProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
    department: string;
    specialty: string;
    bio: string;
    avatar: string;
  };
  onProfileChange: (
    key: keyof ProfileFormProps["profile"],
    value: string
  ) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onProfileChange,
}) => {
  return (
    <Card className="border-none shadow-sm rounded-[16px]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <Button fixedWidth className="w-full">
            Cambiar foto
          </Button>
        </div>
        <div className="md:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm text-[#333333]">
                Nombre
              </label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onProfileChange("firstName", e.target.value)
                }
                className="h-10 text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm text-[#333333]">
                Apellido
              </label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onProfileChange("lastName", e.target.value)
                }
                className="h-10 text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-[#333333]">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onProfileChange("email", e.target.value)
              }
              className="h-10 text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="institution" className="text-sm text-[#333333]">
              Institución
            </label>
            <Input
              id="institution"
              value={profile.institution}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onProfileChange("institution", e.target.value)
              }
              className="h-10 text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm text-[#333333]">
              Biografía
            </label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => onProfileChange("bio", e.target.value)}
              className="w-full p-2 min-h-[100px] text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="pt-4">
            <Button>
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileForm;
