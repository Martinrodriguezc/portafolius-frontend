import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentLayout from "./pages/layout/StudentLayout";
import TeacherLayout from "./pages/layout/TeacherLayout";

import StudentDashboardPage from "./pages/Student/Dashboard";
import StudentMaterialsPage from "./pages/Student/Materials";
import StudentProfilePage from "./pages/Student/Profile";
import StudentProgressPage from "./pages/Student/Progress";
import StudentUploadPage from "./pages/Student/Upload";
import StudentVideosPage from "./pages/Student/VideosPage";
import StudentVideoPage from "./pages/Student/Video";

import TeacherDashboardPage from "./pages/Teacher/Dashboard";
import TeacherEvaluationsPage from "./pages/Teacher/Evaluations";
import TeacherStudentsPage from "./pages/Teacher/Students";
import TeacherSettingsPage from "./pages/Teacher/Settings";
import StudentProfileTeacherPage from "./pages/Teacher/StudentProfile";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="materials" element={<StudentMaterialsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="progress" element={<StudentProgressPage />} />
          <Route path="upload" element={<StudentUploadPage />} />
          <Route path="videos" element={<StudentVideosPage />} />
          <Route path="videos/:id" element={<StudentVideoPage />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="evaluations" element={<TeacherEvaluationsPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route
            path="students/new"
            element={<StudentProfileTeacherPage mode="create" />}
          />
          <Route
            path="students/:id"
            element={<StudentProfileTeacherPage mode="view" />}
          />
          <Route path="settings" element={<TeacherSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;