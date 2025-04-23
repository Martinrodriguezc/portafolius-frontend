import TabsContainer from "../../../components/common/Tabs/TabsContainer";
import { PendingVideosTab } from "../../../components/teacher/videos/PendingVideos";

export default function TeacherMultipleVideosPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-[20px] font-bold text-[#333333]">Videos del estudio</h1>
        <p className="text-[#A0A0A0]">
          Revisa los videos del estudio por evaluar
        </p>
      </header>

      <TabsContainer defaultValue="pending" className="w-full">
          <PendingVideosTab />
      </TabsContainer>
    </div>
  );
}
