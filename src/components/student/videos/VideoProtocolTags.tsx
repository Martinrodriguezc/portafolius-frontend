import React from "react";
import { Info } from "lucide-react";
import Card from "../../common/Card/Card";
import { Interaction } from "../../../types/interaction";

interface VideoProtocolTagsProps {
  interactions: Interaction[];
}

const VideoProtocolTags: React.FC<VideoProtocolTagsProps> = ({ interactions }) => {
  const student = interactions.find(i => i.role === "estudiante");
  const professor = interactions.find(i => i.role === "profesor");

  const renderTags = (i: Interaction) => (
    <>
      {i.protocolKey && <p><strong>Protocolo:</strong> {i.protocolKey}</p>}
      {i.windowName && <p><strong>Ventana:</strong> {i.windowName}</p>}
      {i.findingName && <p><strong>Hallazgo:</strong> {i.findingName}</p>}
      {i.possibleDiagnosisName && <p><strong>Diagnóstico:</strong> {i.possibleDiagnosisName}</p>}
      {i.subdiagnosisName && <p><strong>Subdiagnóstico:</strong> {i.subdiagnosisName}</p>}
      {i.subSubName && <p><strong>Sub-Sub:</strong> {i.subSubName}</p>}
      {i.thirdOrderName && <p><strong>3er orden:</strong> {i.thirdOrderName}</p>}
    </>
  );

  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">Etiquetas del protocolo</h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {student ? (
          <div>
            <h4 className="text-[15px] font-semibold text-[#333333]">Etiquetas del Estudiante</h4>
            <div className="mt-2 space-y-1">
              {renderTags(student)}
            </div>
          </div>
        ) : (
          <p className="text-[14px] text-[#666666]">No hay etiquetas registradas por el estudiante.</p>
        )}

        {student && professor && (
          <div className="border-t border-slate-200 opacity-50" />
        )}

        {professor ? (
          <div>
            <h4 className="text-[15px] font-semibold text-[#333333]">Etiquetas del Profesor</h4>
            <div className="mt-2 space-y-1">
              {renderTags(professor)}
            </div>
          </div>
        ) : (
          <p className="text-[14px] text-[#666666]">No hay etiquetas registradas por el profesor.</p>
        )}
      </div>
    </Card>
  );
};

export default VideoProtocolTags;