import { Calendar, CheckCircle, Clock, FileVideo } from "lucide-react";
import { StudyWithStatus } from "../../../types/Study";
import Card from "../../common/Card/Card";
import { Badge } from "../../common/Badge/Badge";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

interface EvaluationCardProps {
    study: StudyWithStatus;
    variant: "pending" | "completed";
    context?: "teacher" | "admin";
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({ 
    study, 
    variant, 
    context = "teacher"
}) => {
    const isPending = variant === "pending";
    
    const basePath = context === "admin" ? "/admin" : "/teacher";
    const videoLink = `${basePath}/evaluations/${study.study_id}/videos`;
    
    return (
        <Card className="rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${isPending ? "bg-amber-100" : "bg-green-100"}`}>
                    {isPending
                        ? <Clock className="h-6 w-6 text-amber-500" />
                        : <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-[#333333]">
                            {study.title} {study.description}
                        </h3>
                        <Badge>
                            {isPending ? "Pendiente" : "Completada"}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-[#4E81BD]" />
                            {new Date(
                                isPending ? study.created_at : study.created_at!
                            ).toLocaleDateString("es-ES")}
                        </span>
                        <span className="flex items-center gap-1">
                            <FileVideo className="h-4 w-4 text-[#4E81BD]" />
                            {study.description.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
            <Link to={videoLink}>
                <Button className="w-full sm:w-auto bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white px-6 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all">
                    Ver videos
                </Button>
            </Link>
        </Card>
    );
};