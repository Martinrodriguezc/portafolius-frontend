import { Search, UserPlus, Filter, ArrowUpDown } from "lucide-react";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import TabsContainer from "../../components/common/Tabs/TabsContainer";
import TabsList from "../../components/common/Tabs/TabsList";
import TabsButton from "../../components/common/Tabs/TabsButton";
import TabsPanel from "../../components/common/Tabs/TabsPanel";
import TeacherLayout from "../layout/TeacherLayout";
import StudentsPreviewInfo from "../../components/teacher/StudentsPreviewInfo";
import { sampleStudentsData } from "./utils/utils";
import { useStudentFilter } from "../../hooks/teacher/useStudentFilter";
import Input from "../../components/common/Input/Input";

export default function TeacherStudentsLayout() {
  const { searchTerm, filteredStudents, handleSearch } =
    useStudentFilter(sampleStudentsData);

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#333333]">
              Estudiantes
            </h1>
            <p className="text-[#A0A0A0]">
              Gestiona y supervisa el progreso de tus estudiantes
            </p>
          </div>
          <Button>
            <UserPlus />
            Añadir Estudiante
          </Button>
        </div>
      </header>

      <Card className="border-none shadow-sm rounded-[16px] mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]"
              size={18}
            />
            <Input
              id="search"
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 h-[42px] text-[14px] border-[#A0A0A0] rounded-[8px]"
            />
          </div>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Ordenar
          </Button>
        </div>
      </Card>

      <TabsContainer defaultValue="all">
        <TabsList className="mb-6">
          <TabsButton value="all">Todos</TabsButton>
          <TabsButton value="active">Activos</TabsButton>
          <TabsButton value="inactive">Inactivos</TabsButton>
        </TabsList>

        <TabsPanel value="all" className="space-y-4">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="border-none shadow-sm rounded-[16px]"
            >
              <StudentsPreviewInfo student={student} />
            </Card>
          ))}
        </TabsPanel>

        <TabsPanel value="active" className="space-y-4">
          {filteredStudents
            .filter((student) => student.status.toLowerCase() === "active")
            .map((student) => (
              <Card
                key={student.id}
                className="border-none shadow-sm rounded-[16px]"
              >
                <StudentsPreviewInfo student={student} />
              </Card>
            ))}
        </TabsPanel>

        <TabsPanel value="inactive" className="space-y-4">
          {filteredStudents
            .filter((student) => student.status.toLowerCase() !== "active")
            .map((student) => (
              <Card
                key={student.id}
                className="border-none shadow-sm rounded-[16px]"
              >
                <StudentsPreviewInfo student={student} />
              </Card>
            ))}
        </TabsPanel>
      </TabsContainer>
    </div>
  );
}

export const TeacherStudentsPage = () => (
  <TeacherLayout>
    <TeacherStudentsLayout />
  </TeacherLayout>
);
