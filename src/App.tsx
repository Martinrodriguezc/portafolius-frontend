import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";
import  StudentDashboardPage  from "./pages/Student/Dashboard";
import StudentMaterialsPage from "./pages/Student/Materials";
import StudentProfilePage from "./pages/Student/Profile";
import StudentProgressPage from "./pages/Student/Progress";
import StudentUploadPage from "./pages/Student/Upload";
import StudentVideoPage from "./pages/Student/Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/student/materials" element={<StudentMaterialsPage/>}/>
        <Route path="/student/profile" element={<StudentProfilePage/>}/>
        <Route path="/student/progress" element={<StudentProgressPage/>}/>
        <Route path="/student/upload" element={<StudentUploadPage/>}/>
        <Route path="/student/video" element={<StudentVideoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;