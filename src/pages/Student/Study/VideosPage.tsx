import { pendingVideos } from "../../../utils/videoConstants";
import TabsContainer from "../../../components/common/Tabs/TabsContainer";
import TabsList from "../../../components/common/Tabs/TabsList";
import TabsButton from "../../../components/common/Tabs/TabsButton";
import TabsPanel from "../../../components/common/Tabs/TabsPanel";
import { CheckSquare, Clock } from "lucide-react";
import { PendingVideosTab } from "../../../components/student/videos/PendingVideosTab";
import { EvaluatedVideosTab } from "../../../components/student/videos/EvaluatedVideosTab";

export default function StudentMultipleVideosPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Mis Videos</h1>
        <p className="text-[#A0A0A0]">
          Revisa tus videos evaluados y pendientes de evaluación
        </p>
      </header>

      <TabsContainer defaultValue="evaluated" className="w-full">
        <TabsList className="mb-6">
          <TabsButton value="evaluated">
            <CheckSquare className="mr-2 h-4 w-4" />
            Evaluados
          </TabsButton>
          <TabsButton value="pending">
            <Clock className="mr-2 h-4 w-4" />
            Pendientes
          </TabsButton>
        </TabsList>

        <TabsPanel value="evaluated">
          <EvaluatedVideosTab />
        </TabsPanel>
        <TabsPanel value="pending">
          <PendingVideosTab videos={pendingVideos} />
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}
