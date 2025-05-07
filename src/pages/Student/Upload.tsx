import { Link } from "react-router-dom";
import { ClipboardList, PlusCircle } from "lucide-react";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { Label } from "../../components/common/Label/Label";
import { Progress } from "../../components/common/Progress/Progress";
import { Select, SelectValue } from "../../components/common/Select/SelectBase";
import { SelectTrigger, SelectContent } from "../../components/common/Select/SelectInteraction";
import { SelectItem } from "../../components/common/Select/SelectItems";
import { useUploadPage } from "../../hooks/upload/useUploadPage";
import { UploadSection } from "../../components/student/upload/UploadSection";

export default function UploadPage() {
  const {
    studies,
    files,
    uploadProgress,
    isUploading,
    selectedStudy,
    setSelectedStudy,
    handleFileChange,
    removeFile,
    updateFileProtocol,
    updateFileOrgan,
    updateFileStructure,
    updateFileCondition,
    addTagToFile,
    removeTagFromFile,
    handleSubmit,
  } = useUploadPage();

  const currentStudy = studies.find((s) => s.id === selectedStudy);

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-3xl rounded-[16px]">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="h-6 w-6 text-[#4E81BD]" />
            <h1 className="text-[20px] font-bold text-[#333333]">Subir videos a estudio</h1>
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="study" className="text-[14px] text-[#333333]">
              Selecciona el estudio
            </Label>
            <div className="space-y-2">
              <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                <SelectTrigger id="study" className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]">
                  <SelectValue placeholder="Selecciona un estudio existente" />
                </SelectTrigger>
                <SelectContent>
                  {studies.map((study) => (
                    <SelectItem key={study.id} value={study.id}>
                      <div className="flex flex-col">
                        <span>{study.title}</span>
                        <span className="text-[11px] text-[#A0A0A0]">
                          Fecha: {new Date(study.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Link
                to="/student/create_study"
                className="flex items-center text-[14px] text-[#4E81BD] hover:text-[#4E81BD]/80 transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Crear nuevo estudio
              </Link>
            </div>
          </div>

          {currentStudy && (
            <div className="bg-blue-50 border border-blue-100 rounded-[8px] p-4 mb-6">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-md mr-3">
                  <ClipboardList className="h-5 w-5 text-[#4E81BD]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#333333]">
                    {currentStudy.title}
                  </h3>
                  <p className="text-[12px] text-[#666666]">
                    Fecha: {new Date(currentStudy.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <UploadSection
            files={files}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            updateFileProtocol={updateFileProtocol}
            updateFileOrgan={updateFileOrgan}
            updateFileStructure={updateFileStructure}
            updateFileCondition={updateFileCondition}
            addTagToFile={addTagToFile}
            removeTagFromFile={removeTagFromFile}
          />

          {isUploading && (
            <div className="space-y-2 mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[14px] text-[#333333]">Subiendo videos...</span>
                <span className="text-[14px] text-[#333333]">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
            disabled={!selectedStudy || files.length === 0}
          >
            Subir videos al estudio
          </Button>
        </div>
      </Card>
    </div>
  );
}
