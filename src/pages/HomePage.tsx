import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button/Button";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");
  const handleStudentDashboard = () => navigate("/student");
  const handleTeacherDashboard = () => navigate("/teacher");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-center px-4">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight mb-4">
          PortafoliUS
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Plataforma educativa para el aprendizaje y la retroalimentación efectiva en Ultrasonido Clínico.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg"
        >
          Login
        </Button>
        <Button
          onClick={handleSignup}
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg"
        >
          Sign Up
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleStudentDashboard}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg"
        >
          Student Dashboard
        </Button>
        <Button
          onClick={handleTeacherDashboard}
          className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-lg"
        >
          Teacher Dashboard
        </Button>
      </div>
    </main>
  );
}