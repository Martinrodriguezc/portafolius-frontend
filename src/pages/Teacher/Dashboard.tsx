import { LoadingState } from "../../components/teacher/dashboard/Loading";
import { StatsPanel } from "../../components/teacher/dashboard/StatsPanels";
import { TipsSection } from "../../components/teacher/dashboard/Tips";
import { VideoTabsPanel } from "../../components/teacher/dashboard/VideoTabsPanel";
import { useTeacherDashboard } from "../../hooks/teacher/dashboard/useTeacherDashboard";
import { useAllStudies } from "../../hooks/teacher/useAllStudies/useAllStudies";
import { ErrorState } from "../../components/teacher/dashboard/Error";
import { PageHeader } from "../../components/teacher/dashboard/Header";

export default function TeacherDashboardPage() {
  const {
    lastName,
    stats,
    statsLoading,
    statsError,
    pending,
    evaluated,
    vidsLoading,
    vidsError,
  } = useTeacherDashboard();
  const {
    pending: studiesPending,
    completed: studiesCompleted,
    loading: studiesLoading,
    error: studiesError,
  } = useAllStudies();

  const loading = statsLoading || vidsLoading || studiesLoading;
  const error = statsError || vidsError || studiesError;
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.toString()} />;
  if (!stats) return null;

  const allStudies = [...studiesPending, ...studiesCompleted];

  return (
    <main className="p-8 md:p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader lastName={lastName} />
      <StatsPanel
        pendingCount={stats.pendingCount}
        evaluatedToday={stats.evaluatedToday}
        studentCount={stats.studentCount}
      />
      <VideoTabsPanel
        pending={pending}
        evaluated={evaluated}
        allStudies={allStudies}
      />
      <TipsSection
        total={pending.length + evaluated.length}
        pendingCount={pending.length}
      />
    </main>
  );
}