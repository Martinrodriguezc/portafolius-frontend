import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import Button from "../../common/Button/Button";

interface PageHeaderProps {
  studentName: string;
  studentEmail: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  studentName,
  studentEmail,
}) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-[#4E81BD]/10 p-3 rounded-full">
          <User className="h-8 w-8 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">
            {studentName}
          </h1>
          <p className="text-[#666666] mt-1">{studentEmail}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-slate-300 text-[#333333] hover:bg-slate-50 flex items-center gap-2"
          onClick={() => nav(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
    </div>
  );
};
