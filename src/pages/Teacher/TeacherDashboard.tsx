import Card from "../../components/common/Card/Card";
import TeacherLayout from "../layout/TeacherLayout";

export default function TeacherDashboardLayout() {
  // Datos de ejemplo
  const pendingVideos = [
    {
      id: 1,
      title: "Ecografía abdominal",
      date: "12 mayo, 2023",
      student: "Carlos Rodríguez",
      diagnosis: "Normal",
    },
    {
      id: 2,
      title: "Ecografía cardíaca",
      date: "5 mayo, 2023",
      student: "Ana Martínez",
      diagnosis: "Anormal",
    },
    {
      id: 3,
      title: "Ecografía obstétrica",
      date: "28 abril, 2023",
      student: "Laura Sánchez",
      diagnosis: "No concluyente",
    },
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard de Profesor
        </h1>
        <p className="text-gray-500">Bienvenido de nuevo, Dr. García</p>
      </header>
      {pendingVideos.map(() => {
        return <p></p>;
      })}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Pendientes" description="Videos por evaluar" amount={8} />
        <Card title="Evaluados" description="Videos evaluados hoy" amount={5} />
        <Card
          title="Estudiantes"
          description="Total de estudiantes"
          amount={24}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Videos Pendientes de Evaluación
        </h2>
      </div>
    </div>
  );
}

export const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <TeacherDashboardLayout />
    </TeacherLayout>
  );
};
