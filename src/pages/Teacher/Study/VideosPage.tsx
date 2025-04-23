import TabsContainer from "../../../components/common/Tabs/TabsContainer";
import { PendingVideosTab } from "../../../components/teacher/videos/PendingVideos";
import { ReturnButton } from "../../../components/common/Button/ReturnButton";

export default function TeacherMultipleVideosPage() {

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-[20px] font-bold text-[#333333]">Videos del estudio</h1>
          <p className="text-[#A0A0A0]">
            Revisa los videos del estudio por evaluar
          </p>
        </div>
        <ReturnButton />
      </header>

      <TabsContainer defaultValue="pending" className="w-full">
        <PendingVideosTab />
      </TabsContainer>
    </div>
  );
}
