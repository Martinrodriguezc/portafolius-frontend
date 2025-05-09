import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function MaterialsSearchFilter() {
  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar materiales..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors">
        <Filter className="h-4 w-4 text-slate-500" />
        <span className="text-slate-700">Filtrar</span>
      </button>
      <select className="px-4 py-2 border border-slate-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD] bg-white">
        <option value="recent">Más recientes</option>
        <option value="oldest">Más antiguos</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>
    </div>
  );
}