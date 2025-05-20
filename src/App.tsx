import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentLayout from "./pages/layout/StudentLayout";
import TeacherLayout from "./pages/layout/TeacherLayout";

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
import TeacherMaterialsPage from "./pages/Teacher/TeacherMaterialsPage";

import CommentsPage from "./pages/Student/Comments";
import TeacherMultipleVideosPage from "./pages/Teacher/Study/VideosPage";
import TeacherVideoPage from "./pages/Teacher/Study/Video";
import TeacherEvaluateVideoPage from "./pages/Teacher/EvaluateVideoPage";
import StudentProfileTeacherPage from "./pages/Teacher/StudentProfileTeacherPage";
import LearnMorePage from "./pages/LearnMore";
import StudentCreateStudyPage from "./pages/Student/Study";

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
          <Route path="settings" element={<TeacherSettingsPage />} />
          <Route path="materials" element={<TeacherMaterialsPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

