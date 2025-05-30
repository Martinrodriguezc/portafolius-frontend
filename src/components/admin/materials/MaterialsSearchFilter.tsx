import { Search, Filter } from 'lucide-react';

interface MaterialsSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
}

export default function MaterialsSearchFilter({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
}: MaterialsSearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666] h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar materiales por título o descripción..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="text-[#666666] h-5 w-5" />
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E81BD]/30 focus:border-[#4E81BD]"
        >
          <option value="">Todos los tipos</option>
          <option value="document">Documentos</option>
          <option value="video">Videos</option>
          <option value="link">Enlaces</option>
        </select>
      </div>
    </div>
  );
} 