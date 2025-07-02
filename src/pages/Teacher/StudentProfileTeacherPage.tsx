import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile";
import { PageHeader } from "../../components/teacher/StudentProfile/Header";
import { LoadingState } from "../../components/teacher/StudentProfile/Loading";
import { ErrorState } from "../../components/teacher/StudentProfile/Error";
import { StudentInfoCard } from "../../components/teacher/StudentProfile/StudentInfoCard";
import { QuickActions } from "../../components/teacher/StudentProfile/QuickActions";
import { TopMetrics } from "../../components/teacher/StudentProfile/TopMetrics";
import StudentTabs from "../../components/teacher/StudentProfile/StudentTabs";
import { HelpSection } from "../../components/teacher/StudentProfile/HelpSection";
import StatisticsTable from "../../components/teacher/StudentProfile/StatisticsTable";
import { Calendar } from "lucide-react";
import type { Option } from "../../components/common/SearchFilter/SearchFilter";

export default function StudentProfileTeacherPage() {
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);

  const {
    student,
    studentLoading,
    studentError,
    studies,
    studiesLoading,
    studiesError,
  } = useStudentProfile();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "evaluated" | "pending">("all");
  const [sortBy, setSortBy] = useState<"date" | "title" | "score">("date");
  const [activeTab, setActiveTab] = useState<"studies">("studies");

  const statusOptions: Option[] = useMemo(() => {
    const opts: Option[] = [{ label: "Todos", value: "all" }];
    if (studies.some((s) => s.has_evaluation)) opts.push({ label: "Evaluados", value: "evaluated" });
    if (studies.some((s) => !s.has_evaluation)) opts.push({ label: "Pendientes", value: "pending" });
    return opts;
  }, [studies]);

  if (studentLoading || studiesLoading) {
    return (
      <div className="p-8">
        <PageHeader studentName="" studentEmail="" />
        <LoadingState title="Cargando perfil…" />
      </div>
    );
  }
  if (studentError || studiesError || !student) {
    return (
      <div className="p-8">
        <PageHeader studentName="" studentEmail="" />
        <ErrorState message={(studentError || studiesError)?.toString() || ""} />
      </div>
    );
  }

  const total = studies.length;
  const completedCount = studies.filter((s) => s.has_evaluation).length;
  const average =
    completedCount > 0
      ? (
          studies
            .filter((s) => s.has_evaluation)
            .reduce((sum, s) => sum + (s.score || 0), 0) /
          completedCount
        ).toFixed(1)
      : "—";

  return (
    <div className="p-8 space-y-8 bg-slate-50">
      <PageHeader
        studentName={`${student.first_name} ${student.last_name}`}
        studentEmail={student.email}
      />

      <StudentInfoCard student={student} />
      <QuickActions />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-gray-600" /> Protocolos evaluados
        </h2>
        <StatisticsTable studentId={studentId} />
      </section>

      <TopMetrics
        total={total}
        completedCount={completedCount}
        average={average}
        studies={studies}
      />

      <StudentTabs
        studentId={id!}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statusOptions={statusOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        studies={studies}
      />

      <HelpSection />
    </div>
  );
}