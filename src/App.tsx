import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import { TeacherDashboardPage } from "./pages/Teacher/Dashboard";
import { TeacherEvaluationsPage } from "./pages/Teacher/Evaluations";
import { TeacherStudentsPage } from "./pages/Teacher/Students";
import { TeacherSettingsPage } from "./pages/Teacher/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/teacher/evaluations" element={<TeacherEvaluationsPage/>}/>
        <Route path="/teacher/students" element={<TeacherStudentsPage/>}/>
        <Route path="/teacher/settings" element={<TeacherSettingsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
