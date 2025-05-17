import { MessageSquare } from 'lucide-react';
import ReturnButton from '../../common/Button/ReturnButton';

export default function CommentsHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#4E81BD]/10 p-2 rounded-full">
          <MessageSquare className="h-6 w-6 text-[#4E81BD]" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">
            Todos los comentarios
          </h1>
          <p className="text-[#666666]">
            Lista completa de tus comentarios y acceso al video relacionado
          </p>
        </div>
      </div>
      <ReturnButton />
    </header>
  );
}