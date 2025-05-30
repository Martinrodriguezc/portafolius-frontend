import { Search, SlidersHorizontal, ArrowDownUpIcon } from "lucide-react";

export interface Option {
  value: "all" | "evaluated" | "pending" | "date" | "title" | "score";
  label: string;
}

export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  statusFilter: "all" | "evaluated" | "pending";
  setStatusFilter: (f: "all" | "evaluated" | "pending") => void;
  sortBy: "date" | "title" | "score";
  setSortBy: (s: "date" | "title" | "score") => void;
  total: number;
  statusOptions?: Option[];
  sortOptions?: Option[];
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  total,
  statusOptions,
  sortOptions,
}: SearchFilterProps) {
  const statusOpts: Option[] =
    statusOptions ?? [
      { value: "all",       label: "Todos"      },
      { value: "evaluated", label: "Evaluados"  },
      { value: "pending",   label: "Pendientes" },
    ];
  const sortOpts: Option[] =
    sortOptions ?? [
      { value: "date",  label: "Fecha"        },
      { value: "title", label: "Título"       },
      { value: "score", label: "Calificación" },
    ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar estudios…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 items-center flex-1">
        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
          <SlidersHorizontal className="text-gray-500 ml-3 mr-2" size={16} />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as "all" | "evaluated" | "pending")}
            className="appearance-none bg-transparent w-full px-3 py-2 text-sm focus:outline-none"
          >
            {statusOpts.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
          <ArrowDownUpIcon className="text-gray-500 ml-3 mr-2" size={16} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as "date" | "title" | "score")}
            className="appearance-none bg-transparent w-full px-3 py-2 text-sm focus:outline-none"
          >
            {sortOpts.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <span className="text-gray-500 whitespace-nowrap">
          {total} resultado{total === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}