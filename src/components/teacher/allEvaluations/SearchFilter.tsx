import { Filter, SortAsc } from "lucide-react";
import Card from "../../common/Card/Card";

export const SearchFilter: React.FC<{ query: string; onQueryChange: (q: string) => void }> = ({ query, onQueryChange }) => (
    <Card className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
            <input
                type="text"
                placeholder="Buscar evaluaciones..."
                value={query}
                onChange={e => onQueryChange(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
            />
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">Filtrar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
                <SortAsc className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">Ordenar</span>
            </button>
        </div>
    </Card>
);