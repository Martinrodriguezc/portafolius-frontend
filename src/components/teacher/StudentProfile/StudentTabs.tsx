import React, { useMemo, Dispatch, SetStateAction } from "react";
import {
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import SearchFilter, { Option } from "../../common/SearchFilter/SearchFilter";
import { Study } from "../../../types/Study";

interface StudentTabsProps {
  studentId: string;
  activeTab: "studies";
  setActiveTab: Dispatch<SetStateAction<"studies">>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  statusFilter: "all" | "evaluated" | "pending";
  setStatusFilter: Dispatch<SetStateAction<"all" | "evaluated" | "pending">>;
  statusOptions: Option[];
  sortBy: "date" | "title" | "score";
  setSortBy: Dispatch<SetStateAction<"date" | "title" | "score">>;
  studies: Study[];
}

const StudentTabs: React.FC<StudentTabsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  statusOptions,
  sortBy,
  setSortBy,
  studies,
}) => {
  const filtered = useMemo(() => {
    const txt = searchTerm.toLowerCase().trim();
    return studies.filter((st) => {
      const combined = (st.title + " " + (st.description || "")).toLowerCase();
      if (txt && !combined.includes(txt)) return false;
      if (statusFilter === "evaluated" && !st.has_evaluation) return false;
      if (statusFilter === "pending" && st.has_evaluation) return false;
      return true;
    });
  }, [studies, searchTerm, statusFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return (b.score || 0) - (a.score || 0);
    });
  }, [filtered, sortBy]);

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusOptions={statusOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          total={filtered.length}
        />
        <div className="space-y-4 mt-6">
          {sorted.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No hay estudios para mostrar
            </p>
          ) : (
            sorted.map((st) => {
              const evaluado = st.has_evaluation;
              return (
                <Card
                  key={st.id}
                  className={`p-6 bg-white rounded-[16px] shadow-sm border hover:shadow-md transition-all ${
                    evaluado ? "border-green-200" : "border-amber-200"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-[#333333]">
                          {st.title}
                        </h3>
                        {evaluado ? (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Evaluado
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Pendiente
                          </span>
                        )}
                      </div>
                      <p className="text-[#666666] mt-2 mb-4">
                        {st.description || "Sin descripción"}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-[#666666]">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-[#4E81BD]" />
                          Creado: {new Date(st.created_at).toLocaleDateString("es-ES")}
                        </div>
                        <div className="flex items-center gap-1">
                          <ChevronRight className="h-4 w-4 text-[#4E81BD]" />
                          Calificación: {st.score ?? "—"}
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 md:border-l md:pl-6 md:border-slate-200 justify-end">
                      <Link to={`/teacher/evaluations/${st.id}/videos`}>
                        <Button className="w-full bg-[#4E81BD] text-white px-4 py-2 rounded-[8px] shadow-sm">
                          Ver detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTabs;