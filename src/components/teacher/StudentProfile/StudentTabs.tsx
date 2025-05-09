import React from "react";
import { Clock, CheckCircle, History, FileText, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import SearchAndFilterControls from "../../common/SeacrhFilter/SearchFilter";
import { Study } from "../../../types/Study";

interface StudentTabsProps {
  studentId: string;
  activeTab: string;
  setActiveTab: (t: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (f: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  sortedStudies: Study[];
  recentActivity: { id: number; type: string; date: Date }[];
  teacherNotes: { id: number; text: string; date: Date }[];
}

export const StudentTabs: React.FC<StudentTabsProps> = ({
  studentId,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortedStudies,
}) => (
  <div className="bg-white rounded-[16px] shadow-sm border border-slate-200 overflow-hidden">
    <div className="flex border-b border-slate-200">
      {[
        { key: "studies", icon: <Clock />, label: "Estudios" },
        { key: "activity", icon: <History />, label: "Actividad" },
        { key: "notes", icon: <FileText />, label: "Notas" },
      ].map((tab) => (
        <button
          key={tab.key}
          className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
            activeTab === tab.key
              ? "text-[#4E81BD] border-b-2 border-[#4E81BD]"
              : "text-[#666666] hover:bg-slate-50"
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
    <div className="p-6">
      {/* STUDIES */}
      {activeTab === "studies" && (
        <>
          <SearchAndFilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            total={sortedStudies.length}
          />
          <div className="space-y-4 mt-6">
            {sortedStudies.map((st) => (
              <Card
                key={st.id}
                className={`p-6 bg-white rounded-[16px] shadow-sm border hover:shadow-md transition-all ${
                  st.status === "EVALUADO" ? "border-green-200" : "border-amber-200"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-[#333333]">
                        {st.title}
                      </h3>
                      {st.status === "EVALUADO" ? (
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
                        <Calendar className="h-4 w-4 text-[#4E81BD]" />
                        Creado: {new Date(st.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChevronRight className="h-4 w-4 text-[#4E81BD]" />
                        ID: {st.id}
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
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
