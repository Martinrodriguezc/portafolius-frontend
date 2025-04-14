"use client"

import { useState } from "react"
import Button from "../../components/common/Button/Button";
import { Card, CardContent }  from "../../components/common/Card/Card";
import BaseInput from "../../components/common/Input/BaseInput";
import label from "../../components/common/Label/Label";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import Switch from "../../components/common/Switch/Switch"
import { User, Bell, Shield, LogOut } from "lucide-react"

export default function ProfilePage() {
  // Datos hardcodeados del perfil
  const [profile, setProfile] = useState({
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    institution: "Universidad Médica Nacional",
    specialty: "Medicina de Emergencias",
    year: "3er año de residencia",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  // Configuración de notificaciones
  const [notifications, setNotifications] = useState({
    email: true,
    evaluations: true,
    comments: true,
    materials: false,
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mi Perfil</h1>
        <p className="text-[#A0A0A0]">Gestiona tu información personal y preferencias</p>
      </header>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Información Personal
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-none shadow-sm rounded-[16px]">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-[#F4F4F4] flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Cambiar foto
                  </Button>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[14px] text-[#333333]">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[14px] text-[#333333]">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[14px] text-[#333333]">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-[14px] text-[#333333]">
                      Institución
                    </Label>
                    <Input
                      id="institution"
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-[14px] text-[#333333]">
                        Especialidad
                      </Label>
                      <Input
                        id="specialty"
                        value={profile.specialty}
                        onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                        className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-[14px] text-[#333333]">
                        Año académico
                      </Label>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-sm rounded-[16px]">
            <CardContent className="p-8">
              <h3 className="text-[16px] font-medium text-[#333333] mb-6">Preferencias de notificaciones</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-[#333333]">Notificaciones por correo</h4>
                    <p className="text-[13px] text-[#A0A0A0]">
                      Recibir notificaciones generales por correo electrónico
                    </p>
                  </div>
                  <Switch checked={notifications.email} onCheckedChange={() => handleNotificationChange("email")} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-[#333333]">Evaluaciones de estudios</h4>
                    <p className="text-[13px] text-[#A0A0A0]">Notificar cuando un profesor evalúe tus estudios</p>
                  </div>
                  <Switch
                    checked={notifications.evaluations}
                    onCheckedChange={() => handleNotificationChange("evaluations")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-[#333333]">Comentarios nuevos</h4>
                    <p className="text-[13px] text-[#A0A0A0]">
                      Notificar cuando haya nuevos comentarios en tus estudios
                    </p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={() => handleNotificationChange("comments")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-[#333333]">Nuevo material de estudio</h4>
                    <p className="text-[13px] text-[#A0A0A0]">Notificar cuando se añada nuevo material educativo</p>
                  </div>
                  <Switch
                    checked={notifications.materials}
                    onCheckedChange={() => handleNotificationChange("materials")}
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
                    Guardar preferencias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-none shadow-sm rounded-[16px]">
            <CardContent className="p-8">
              <h3 className="text-[16px] font-medium text-[#333333] mb-6">Cambiar contraseña</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[14px] text-[#333333]">
                    Contraseña actual
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-[14px] text-[#333333]">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[14px] text-[#333333]">
                    Confirmar nueva contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px]">
                    Actualizar contraseña
                  </Button>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-[#A0A0A0]/20">
                <h3 className="text-[16px] font-medium text-[#333333] mb-4">Cerrar sesión en todos los dispositivos</h3>
                <p className="text-[14px] text-[#A0A0A0] mb-4">
                  Esta acción cerrará tu sesión en todos los dispositivos donde hayas iniciado sesión.
                </p>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar todas las sesiones
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
