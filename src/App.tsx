import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentLayout from "./pages/layout/StudentLayout";
import TeacherLayout from "./pages/layout/TeacherLayout";
import AdminLayout from "./pages/layout/AdminLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import GoogleCallbackPage from "./pages/Auth/GoogleCallbackPage";
import RoleSelectionForm from "./components/auth/RoleSelectionForm";

import StudentDashboardPage from "./pages/Student/Dashboard";
import StudentMaterialsPage from "./pages/Student/Materials";
import StudentProfilePage from "./pages/Student/Profile";
import StudentProgressPage from "./pages/Student/Progress";
import StudentUploadPage from "./pages/Student/Upload";
import StudentStudiesPage from "./pages/Student/Study/StudyPage";
import StudentMultipleVideosPage from "./pages/Student/Study/VideosPage";
import StudentVideoPage from "./pages/Student/Study/Video";
import StudentSettingsPage from "./pages/Student/Settings";

import TeacherDashboardPage from "./pages/Teacher/Dashboard";
import TeacherEvaluationsPage from "./pages/Teacher/allEvaluations";
import TeacherStudentsPage from "./pages/Teacher/AllStudents";
import TeacherSettingsPage from "./pages/Teacher/Settings";
import UnauthorizedTeacherPage from "./pages/Teacher/UnauthorizedPage";

import CommentsPage from "./pages/Student/Comments";
import TeacherMultipleVideosPage from "./pages/Teacher/Study/VideosPage";
import TeacherVideoPage from "./pages/Teacher/Study/Video";
import TeacherEvaluateVideoPage from "./pages/Teacher/EvaluateVideoPage";
import StudentProfileTeacherPage from "./pages/Teacher/StudentProfileTeacherPage";
import LearnMorePage from "./pages/LearnMore";
import StudentCreateStudyPage from "./pages/Student/Study";

import AdminDashboardPage from "./pages/admin/AdminDashboard";
import UserManagementPage from "./pages/admin/UserManagement";
import PendingTeachersPage from "./pages/admin/PendingTeachers";
import AcademicManagementPage from "./pages/admin/AcademicManagement";
import ReportsPage from "./pages/admin/Reports";
import AdminSettingsPage from "./pages/admin/Settings";
import AdminEvaluationsPage from "./pages/admin/AdminEvaluations";
import AdminVideosPage from "./pages/admin/AdminVideosPage";
import AdminVideoPage from "./pages/admin/AdminVideoPage";
import AdminEvaluateVideoPage from "./pages/admin/AdminEvaluateVideo";
import MaterialsManagementPage from "./pages/admin/MaterialsManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/learn_more" element={<LearnMorePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
        <Route path="/select-role" element={<RoleSelectionForm />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="materials" element={<StudentMaterialsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="progress" element={<StudentProgressPage />} />
          <Route path="upload" element={<StudentUploadPage />} />
          <Route path="create_study" element={<StudentCreateStudyPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="settings" element={<StudentSettingsPage />} />

          <Route
            path="/student/:studyId/videos/:clipId"
            element={<StudentVideoPage />}
          />
          <Route path="/student/studies" element={<StudentStudiesPage />} />
          <Route
            path="/student/studies/:id/videos"
            element={<StudentMultipleVideosPage />}
          />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboardPage />} />

          {/* --- estudiantes ------------------------------------------------ */}
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/new" element={<StudentProfileTeacherPage />} />
          <Route path="students/:id" element={<StudentProfileTeacherPage />} />

          {/* --- evaluaciones ---------------------------------------------- */}
          <Route path="evaluations" element={<TeacherEvaluationsPage />} />
          <Route path="evaluations/:id/videos" element={<TeacherMultipleVideosPage />} />
          <Route path="evaluations/:studyId/videos/:clipId" element={<TeacherVideoPage />} />
          <Route path="evaluations/:studyId/videos/:clipId/evaluate" element={<TeacherEvaluateVideoPage />} />


          {/* --- ajustes ---------------------------------------------------- */}
          <Route path="settings" element={<TeacherSettingsPage />} />
        </Route>

        <Route path="/teacher/unauthorized" element={<UnauthorizedTeacherPage />} />

        {/* --- Admin Routes ---------------------------------------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="pending-teachers" element={<PendingTeachersPage />} />
          <Route path="academic" element={<AcademicManagementPage />} />
          <Route path="materials" element={<MaterialsManagementPage />} />
          <Route path="evaluations" element={<AdminEvaluationsPage />} />
          <Route path="evaluations/:id/videos" element={<AdminVideosPage />} />
          <Route path="evaluations/:studyId/videos/:clipId" element={<AdminVideoPage />} />
          <Route path="evaluations/:studyId/videos/:clipId/evaluate" element={<AdminEvaluateVideoPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

