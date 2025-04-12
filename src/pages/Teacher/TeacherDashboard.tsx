import Card from "../../components/common/Card/Card";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import VideoCard from "../../components/teacher/VideoCard";
import TeacherLayout from "../layout/TeacherLayout";
import { filterVideosByStatus, sampleVideoData } from "./utils/utils";

export default function TeacherDashboardLayout() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard de Profesor
        </h1>
        <p className="text-gray-500">Bienvenido de nuevo, Dr. García</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Pendientes" description="Videos por evaluar" amount={8} />
        <Card title="Evaluados" description="Videos evaluados hoy" amount={5} />
        <Card
          title="Estudiantes"
          description="Total de estudiantes"
          amount={24}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Videos Pendientes de Evaluación
        </h2>
      </div>

      <TabsContainer defaultValue="pendiente">
        <TabsList className="mb-6">
          <TabsButton value="pendiente">Pendiente</TabsButton>
          <TabsButton value="evaluado">Evaluado</TabsButton>
        </TabsList>

        <TabsPanel value="pendiente" className="space-y-4">
          {filterVideosByStatus("pendiente", sampleVideoData).map((video) => (
            <VideoCard video={video} />
          ))}
        </TabsPanel>

        <TabsPanel value="evaluado" className="space-y-4">
          {filterVideosByStatus("evaluado", sampleVideoData).map((video) => (
            <VideoCard video={video} />
          ))}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <TeacherDashboardLayout />
    </TeacherLayout>
  );
};
