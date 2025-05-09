import React from 'react';
import { Lightbulb, Clock } from 'lucide-react';
import Card from '../../common/Card/Card';

export default function CommentsSuggestions() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="rounded-[16px] border border-slate-200 p-6 flex items-start gap-4">
        <Lightbulb className="h-6 w-6 text-[#4E81BD] mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-[#333333] mb-1">
            Da tu feedback
          </h3>
          <p className="text-sm text-[#666666]">
            Aprovecha tus estudios para dejar comentarios útiles y ayudar a tus compañeros.
          </p>
        </div>
      </Card>
      <Card className="rounded-[16px] border border-slate-200 p-6 flex items-start gap-4">
        <Clock className="h-6 w-6 text-amber-500 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-[#333333] mb-1">
            Revisa feedback pendiente
          </h3>
          <p className="text-sm text-[#666666]">
            Si ves pocos comentarios, vuelve más tarde—puede que tus videos estén en evaluación.
          </p>
        </div>
      </Card>
    </div>
  );
}