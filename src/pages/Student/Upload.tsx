import { useUploadPage } from "../../hooks/upload/useUploadPage";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import { Label } from "../../components/common/Label/Label";
import { Textarea } from "../../components/common/Textarea/Textarea";
import { Progress } from "../../components/common/Progress/Progress";
import { UploadSection } from "../../components/student/upload/UploadSection";
import { TagSection } from "../../components/student/upload/TagSection";
import { organOptions, structureOptions, conditionOptions } from "../../utils/uploadConstants";

export default function UploadPage() {
  const {
    files,
    uploadProgress,
    isUploading,
    protocol,
    setProtocol,
    comment,
    setComment,
    tags,
    handleFileChange,
    removeFile,
    handleSubmit,
    selectedOrgan,
    setSelectedOrgan,
    selectedStructure,
    setSelectedStructure,
    selectedCondition,
    setSelectedCondition,
    addTag,
    removeTag,
  } = useUploadPage();

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-3xl rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#333333] mb-6">Subir estudio</h1>

        <UploadSection files={files} handleFileChange={handleFileChange} removeFile={removeFile} />

        <TagSection
          selectedOrgan={selectedOrgan}
          setSelectedOrgan={setSelectedOrgan}
          selectedStructure={selectedStructure}
          setSelectedStructure={setSelectedStructure}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          organOptions={organOptions}
          structureOptions={structureOptions}
          conditionOptions={conditionOptions}
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
        />

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
              <span className="text-[14px] text-[#333333]">Subiendo estudio...</span>
              <span className="text-[14px] text-[#333333]">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isUploading || files.length < 4 || files.length > 8 || !protocol}
          className="w-full bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-[14px] font-medium py-[12px] rounded-[8px] mt-6"
        >
          Enviar estudio
        </Button>
      </Card>
    </div>
  );
}