import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsHeader from './CommentsHeader';
import Button from '../../common/Button/Button';

export default function CommentsEmpty() {
  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <CommentsHeader />
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-[16px] shadow-sm border border-slate-100 p-10 text-center">
        <div className="bg-[#4E81BD]/10 p-6 rounded-full mb-6">
          <BookOpen className="h-12 w-12 text-[#4E81BD]" />
        </div>
        <h2 className="text-[22px] font-semibold text-[#333333] mb-3">
          No hay comentarios
        </h2>
        <p className="text-[16px] text-[#666666] mb-6 max-w-md">
          Aún no has hecho comentarios. Ve a tus estudios y deja tu primer comentario.
        </p>
        <Link to="/student/studies">
          <Button className="bg-[#4E81BD] hover:bg-[#4E81BD]/90 text-white text-[16px] font-medium py-3 px-8 rounded-[8px] shadow-sm flex items-center gap-2">
            <Plus className="h-5 w-5" /> Ver estudios
          </Button>
        </Link>
      </div>
    </div>
  );
}