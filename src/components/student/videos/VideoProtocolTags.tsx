import React from "react";
import { Info } from "lucide-react";
import Card from "../../common/Card/Card";
import { Interaction } from "../../../types/interaction";

interface VideoProtocolTagsProps {
  interactions: Interaction[];
}

const VideoProtocolTags: React.FC<VideoProtocolTagsProps> = ({ interactions }) => {
  return (
    <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-[#4E81BD]" />
          <h3 className="text-[16px] font-semibold text-[#333333]">Etiquetas del protocolo</h3>
        </div>
      </div>
      <div className="p-6 space-y-2">
        {interactions.length > 0 ? (
          <div className="space-y-1">
            {interactions[0].protocolKey && (
              <p><strong>Protocolo:</strong> {interactions[0].protocolKey}</p>
            )}
            {interactions[0].windowName && (
              <p><strong>Ventana:</strong> {interactions[0].windowName}</p>
            )}
            {interactions[0].findingName && (
              <p><strong>Hallazgo:</strong> {interactions[0].findingName}</p>
            )}
            {interactions[0].possibleDiagnosisName && (
              <p><strong>Diagnóstico:</strong> {interactions[0].possibleDiagnosisName}</p>
            )}
            {interactions[0].subdiagnosisName && (
              <p><strong>Subdiagnóstico:</strong> {interactions[0].subdiagnosisName}</p>
            )}
            {interactions[0].subSubName && (
              <p><strong>Sub-Sub:</strong> {interactions[0].subSubName}</p>
            )}
            {interactions[0].thirdOrderName && (
              <p><strong>3er orden:</strong> {interactions[0].thirdOrderName}</p>
            )}
          </div>
        ) : (
          <p className="text-[14px] text-[#666666]">No hay etiquetas registradas.</p>
        )}
      </div>
    </Card>
  );
};

export default VideoProtocolTags; 