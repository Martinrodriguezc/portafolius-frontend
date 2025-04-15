import React from "react";
import Card from "../../../components/common/Card/Card";

interface ProtocolItem {
  protocol: string;
  score: number;
  studies: number;
}

interface ProtocolsTabProps {
  protocolPerformance: ProtocolItem[];
}

export function ProtocolsTab({ protocolPerformance }: ProtocolsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {protocolPerformance.map((protocol, index) => (
        <Card key={index} className="rounded-[16px] p-6">
          <h3 className="text-[16px] font-medium text-[#333333] mb-2">{protocol.protocol}</h3>
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-[24px] font-bold text-[#333333]">{protocol.score}/10</div>
            <div className="text-[14px] text-[#A0A0A0]">({protocol.studies} estudios)</div>
          </div>
          <div className="h-[200px] flex items-center justify-center bg-[#F4F4F4] rounded-lg">
            <p className="text-[14px] text-[#A0A0A0]">Gráfica de evolución</p>
          </div>
        </Card>
      ))}
    </div>
  );
}