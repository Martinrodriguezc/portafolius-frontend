import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Stethoscope, Users, Wand2 } from "lucide-react";

import Button from "../components/common/Button/Button";

export default function HomePage() {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/register");
  const handleStudentDashboard = () => navigate("/student");
  const handleTeacherDashboard = () => navigate("/teacher");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-6 w-6 text-[#4E81BD] mr-2" />
            <span className="text-xl font-bold text-slate-800">
              PortafoliUS
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-100 -z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-center bg-no-repeat bg-cover opacity-10 -z-10" />

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4E81BD] text-white text-sm font-medium">
                <Wand2 className="h-4 w-4 mr-2 bg-bl" />
                Ultrasound Clinical Education Platform
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                Master <span className="text-[#4E81BD]">Ultrasound</span> Skills
                with Expert Guidance
              </h1>

              <p className="text-lg text-slate-600 max-w-xl">
                PortafoliUS is an advanced educational platform for effective
                learning and feedback in Clinical Ultrasound, designed for both
                students and educators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" onClick={handleSignup}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleLogin}>
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Ultrasound Education Platform"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Designed for Medical Education Excellence
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Comprehensive Learning
              </h3>
              <p className="text-slate-600">
                Access structured curriculum and resources designed by
                ultrasound experts.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Expert Feedback
              </h3>
              <p className="text-slate-600">
                Receive detailed feedback from experienced educators on your
                ultrasound techniques.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Progress Tracking
              </h3>
              <p className="text-slate-600">
                Monitor your skill development with detailed analytics and
                performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to enhance your ultrasound skills?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Join our platform today and access specialized dashboards for both
            students and educators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStudentDashboard}
              className="px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              Student Dashboard
            </Button>
            <Button
              onClick={handleTeacherDashboard}
              className="px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              Teacher Dashboard
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
            <Stethoscope className="h-6 w-6 text-[#4E81BD] mr-2" />
              <span className="text-lg font-semibold text-slate-800">
                PortafoliUS
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} PortafoliUS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
