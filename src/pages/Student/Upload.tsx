import { useUploadPage } from "../../hooks/upload/useUploadPage";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { Label } from "../../components/common/Label/Label";
import { Textarea } from "../../components/common/Textarea/Textarea";
import { Progress } from "../../components/common/Progress/Progress";
import { UploadSection } from "../../components/student/upload/UploadSection";
import { TagSection } from "../../components/student/upload/TagSection";
import { Select, SelectValue } from "../../components/common/Select/SelectBase";
import {
  SelectContent,
  SelectTrigger,
} from "../../components/common/Select/SelectInteraction";
import { SelectItem } from "../../components/common/Select/SelectItems";
import { useTagsHierarchy } from "../../hooks/upload/useTagsHierarchy";

export default function UploadPage() {
  const {
    files,
    uploadProgress,
    isUploading,
    protocol,
    setProtocol,
    comment,
    setComment,
    handleFileChange,
    removeFile,
    handleSubmit,
    title,
    setTitle,
  } = useUploadPage();

  const tagsState = useTagsHierarchy();

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-3xl rounded-[16px]">
        <div className="p-8">
          <h1 className="text-[20px] font-bold text-[#333333] mb-6">
            Subir estudio
          </h1>

          <div className="space-y-2 mb-6">
            <Label htmlFor="protocol" className="text-[14px] text-[#333333]">
              Selecciona el protocolo
            </Label>
            <Select value={protocol} onValueChange={setProtocol}>
              <SelectTrigger
                id="protocol"
                className="h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
              >
                <SelectValue placeholder="Selecciona un protocolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fate">FATE</SelectItem>
                <SelectItem value="fast">FAST</SelectItem>
                <SelectItem value="rush">RUSH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="protocol" className="text-[14px] text-[#333333]">
              Título del estudio
            </Label>
            <Textarea
              id="title"
              placeholder="Define el título de tu estudio..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-h-[50px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0] mt-4 mb-4"
            ></Textarea>
          </div>

          <UploadSection
            files={files}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
          />

          <TagSection section={{
            ...tagsState,
            selectedOrgan: tagsState.selectedOrgan,
            selectedStructure: tagsState.selectedStructure,
            selectedCondition: tagsState.selectedCondition,
            tags: tagsState.tags,
            setSelectedOrgan: tagsState.setSelectedOrgan,
            setSelectedStructure: tagsState.setSelectedStructure,
            setSelectedCondition: tagsState.setSelectedCondition,
            addTag: tagsState.addTag,
            removeTag: tagsState.removeTag,
          }} />

          <div className="space-y-2 mt-6">
            <Label htmlFor="comment" className="text-[14px] text-[#333333]">
              Comentarios adicionales
            </Label>
            <Textarea
              id="comment"
              placeholder="Añade cualquier información relevante sobre el estudio..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] text-[14px] border-[#A0A0A0] rounded-[8px] placeholder:text-[#A0A0A0]"
            />
          </div>

          {isUploading && (
            <div className="space-y-2 mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-[14px] text-[#333333]">
                  Subiendo estudio...
                </span>
                <span className="text-[14px] text-[#333333]">
                  {uploadProgress}%
                </span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
          >
            Enviar estudio
          </Button>
        </div>
      </Card>
    </div>
  );
}
