// TeacherEvaluationsLayout.tsx
import React from "react";
import {
    FileVideo,
} from "lucide-react";

export const PageHeader: React.FC = () => (
    <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#4E81BD]/10 p-2 rounded-full">
                <FileVideo className="h-6 w-6 text-[#4E81BD]" />
            </div>
            <h1 className="text-[24px] font-bold text-[#333333]">Evaluaciones</h1>
        </div>
        <p className="text-[#666666] ml-12">
            Historial y gestión de tus evaluaciones de estudiantes
        </p>
    </header>
);

