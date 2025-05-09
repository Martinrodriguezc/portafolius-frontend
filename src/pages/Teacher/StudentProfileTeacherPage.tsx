import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useStudentProfile } from "../../hooks/teacher/student/useStudentProfile";
import { PageHeader } from "../../components/teacher/StudentProfile/Header";
import { LoadingState } from "../../components/teacher/StudentProfile/Loading";
import { ErrorState } from "../../components/teacher/StudentProfile/Error";
import { StudentInfoCard } from "../../components/teacher/StudentProfile/StudentInfoCard";
import { QuickActions } from "../../components/teacher/StudentProfile/QuickActions";
import { TopMetrics } from "../../components/teacher/StudentProfile/TopMetrics";
import { StudentTabs } from "../../components/teacher/StudentProfile/StudentTabs";
import { RecommendedResources } from "../../components/teacher/StudentProfile/RecommendedResources";
import { HelpSection } from "../../components/teacher/StudentProfile/HelpSection";


export default function StudentProfileTeacherPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const nav = useNavigate();
  const {
    student,
    studentLoading,
    studentError,
    studies,
    studiesLoading,
    studiesError,
  } = useStudentProfile();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("studies");

  const total = studies.length;
  const completedCount = studies.filter((s) => s.status === "EVALUADO").length;
  const average =
    completedCount > 0
      ? (
          studies
            .filter((s) => s.status === "EVALUADO")
            .reduce((sum, s) => sum + (s.score || 0), 0) / completedCount
        ).toFixed(1)
      : "—";

  const filtered = studies.filter((s) => {
    const matchSearch =
      !searchTerm ||
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "evaluated" && s.status === "EVALUADO") ||
      (statusFilter === "pending" && s.status !== "EVALUADO");
    return matchSearch && matchStatus;
  });
  const sortedStudies = filtered.slice().sort((a, b) => {
    if (sortBy === "date")
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "status") return a.status === b.status ? 0 : a.status === "EVALUADO" ? -1 : 1;
    if (sortBy === "score") return (b.score || 0) - (a.score || 0);
    return 0;
  });

  const recentActivity = [
    { id: 1, type: "login", date: new Date() },
    // ...
  ];
  const teacherNotes = [
    { id: 1, text: "Nota de ejemplo", date: new Date() },
    // ...
  ];
  const recommendedResources = [
    { id: 1, title: "Recurso PDF", type: "pdf" },
    // ...
  ];

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

  return (
    <div className="p-8 space-y-8 bg-slate-50">
      <PageHeader
        studentName={`${student.first_name} ${student.last_name}`}
        studentEmail={student.email}
      />

      <StudentInfoCard student={student} />
      <QuickActions />

      <TopMetrics
        total={total}
        completedCount={completedCount}
        average={average}
        studies={studies}
      />

      <StudentTabs
        studentId={studentId!}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortedStudies={sortedStudies}
        recentActivity={recentActivity}
        teacherNotes={teacherNotes}
      />

      <RecommendedResources resources={recommendedResources} />
      <HelpSection />
    </div>
  );
}
