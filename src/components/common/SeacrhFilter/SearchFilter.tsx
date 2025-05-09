import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { useState } from "react"

interface SearchAndFilterControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    total: number;
}

const SearchAndFilterControls: React.FC<SearchAndFilterControlsProps> = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    total,
}) => {
    const [showFilters, setShowFilters] = useState(true);

    if (total === 0) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 mb-6">
            {/* Header with search */}
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar estudios por título o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E81BD] focus:border-transparent bg-slate-50/50"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                >
                    <Filter className="h-4 w-4" />
                    Filtros
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Expandable filters section */}
            {showFilters && (
                <div className="p-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="space-y-2 min-w-[180px]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-5 bg-[#4E81BD] rounded-full"></div>
                                <span className="text-sm font-semibold text-slate-700">Estado</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <FilterButton
                                    active={statusFilter === "all"}
                                    onClick={() => setStatusFilter("all")}
                                    activeColor="bg-[#4E81BD]"
                                    inactiveColor="border-[#4E81BD] text-[#4E81BD]"
                                >
                                    Todos
                                </FilterButton>
                                <FilterButton
                                    active={statusFilter === "evaluated"}
                                    onClick={() => setStatusFilter("evaluated")}
                                    activeColor="bg-green-600"
                                    inactiveColor="border-green-300 text-green-700"
                                >
                                    Evaluados
                                </FilterButton>
                                <FilterButton
                                    active={statusFilter === "pending"}
                                    onClick={() => setStatusFilter("pending")}
                                    activeColor="bg-amber-500"
                                    inactiveColor="border-amber-300 text-amber-700"
                                >
                                    Pendientes
                                </FilterButton>
                            </div>
                        </div>

                        <div className="h-12 w-px bg-slate-200 hidden md:block"></div>

                        <div className="space-y-2 min-w-[180px]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-5 bg-[#4E81BD] rounded-full"></div>
                                <span className="text-sm font-semibold text-slate-700">Ordenar por</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <FilterButton
                                    active={sortBy === "date"}
                                    onClick={() => setSortBy("date")}
                                    activeColor="bg-[#4E81BD]"
                                    inactiveColor="border-[#4E81BD] text-[#4E81BD]"
                                >
                                    Fecha
                                </FilterButton>
                                <FilterButton
                                    active={sortBy === "title"}
                                    onClick={() => setSortBy("title")}
                                    activeColor="bg-[#4E81BD]"
                                    inactiveColor="border-[#4E81BD] text-[#4E81BD]"
                                >
                                    Título
                                </FilterButton>
                                <FilterButton
                                    active={sortBy === "score"}
                                    onClick={() => setSortBy("score")}
                                    activeColor="bg-[#4E81BD]"
                                    inactiveColor="border-[#4E81BD] text-[#4E81BD]"
                                >
                                    Nota
                                </FilterButton>
                            </div>
                        </div>

                        {searchTerm || statusFilter !== "all" || sortBy !== "date" ? (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("all");
                                    setSortBy("date");
                                }}
                                className="ml-auto mt-4 md:mt-0 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X className="h-4 w-4" />
                                Limpiar filtros
                            </button>
                        ) : null}
                    </div>

                    {/* Active filters summary */}
                    {(searchTerm || statusFilter !== "all" || sortBy !== "date") && (
                        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                            <span className="text-xs text-slate-500">Filtros activos:</span>
                            {searchTerm && (
                                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full flex items-center gap-1">
                                    Búsqueda: {searchTerm}
                                    <button onClick={() => setSearchTerm("")}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            {statusFilter !== "all" && (
                                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusFilter === "evaluated" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                                    }`}>
                                    {statusFilter === "evaluated" ? "Evaluados" : "Pendientes"}
                                    <button onClick={() => setStatusFilter("all")}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                            {sortBy !== "date" && (
                                <span className="text-xs bg-[#4E81BD]/10 text-[#4E81BD] px-2 py-1 rounded-full flex items-center gap-1">
                                    Ordenado por: {sortBy === "title" ? "Título" : "Nota"}
                                    <button onClick={() => setSortBy("date")}>
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Custom filter button component to handle the Button component's constraints
const FilterButton = ({
    children,
    active,
    onClick,
    activeColor,
    inactiveColor
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    activeColor: string;
    inactiveColor: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${active
                    ? `${activeColor} text-white`
                    : `bg-white border ${inactiveColor} hover:bg-slate-50`
                }`}
        >
            {children}
        </button>
    );
};

export default SearchAndFilterControls;
