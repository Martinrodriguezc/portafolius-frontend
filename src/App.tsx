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
import CommentsPage from "./pages/Student/Comments";
import StudentStudiesPage from "./pages/Student/Study/StudyPage";
import StudentMultipleVideosPage from "./pages/Student/Study/VideosPage";
import StudentVideoPage from "./pages/Student/Study/Video";

import TeacherDashboardPage from "./pages/Teacher/Dashboard";
import TeacherEvaluationsPage from "./pages/Teacher/Evaluations";
import TeacherStudentsPage from "./pages/Teacher/Students";
import TeacherSettingsPage from "./pages/Teacher/Settings";

import StudentProfileTeacherPage from "./pages/Teacher/StudentProfile";

import CommentsPage from "./pages/Student/Comments";
import TeacherMultipleVideosPage from "./pages/Teacher/Study/VideosPage";
import TeacherVideoPage from "./pages/Teacher/Study/Video";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
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
          <Route path="comments" element={<CommentsPage />} />
          <Route path="studies" element={<StudentStudiesPage />} />
          <Route path="studies/:id/videos" element={<StudentMultipleVideosPage />} />
          <Route path=":studyId/videos/:id" element={<StudentVideoPage />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="evaluations" element={<TeacherEvaluationsPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/new" element={<StudentProfileTeacherPage mode="create" />} />
          <Route path="students/:id" element={<StudentProfileTeacherPage mode="view" />} />
          <Route path="settings" element={<TeacherSettingsPage />} />
          <Route path="evaluations/:id/videos" element={<TeacherMultipleVideosPage/>}/>
          <Route
            path="/teacher/evaluations/:studyId/videos/:id"
            element={<TeacherVideoPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;