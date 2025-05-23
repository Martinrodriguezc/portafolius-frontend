import { useState } from "react";
import { ExternalLink, Tag, Calendar, Globe } from "lucide-react";
import Card from "../../common/Card/Card";

export interface Link {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  domain?: string;
}

export interface LinksTabProps {
  links: Link[];
}

export default function LinksTab({ links }: LinksTabProps) {
  const [searchTerm] = useState("");

  const filtered = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.tags && link.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const extractDomain = (url: string) => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const makeHref = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <ExternalLink className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#333333] mb-2">No hay enlaces disponibles</h3>
        <p className="text-[#666666] max-w-md">
          Actualmente no hay enlaces disponibles en esta sección. Vuelve a consultar más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((link) => {
        const href = makeHref(link.url);
        const domain = link.domain || extractDomain(link.url);
        return (
          <Card
            key={link.id}
            className="rounded-[12px] p-0 overflow-hidden border border-slate-200 hover:shadow-md transition-all h-full flex flex-col"
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-[#333333] line-clamp-2 flex-1">
                  {link.title}
                </h3>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#4E81BD]/10 text-[#4E81BD] transition-colors shrink-0 ml-2"
                  title="Abrir enlace"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center mb-4 text-xs text-[#666666]">
                <Globe className="h-3 w-3 mr-1 text-[#4E81BD]" />
                <span>{domain}</span>
              </div>

              <p className="text-sm text-[#666666] mb-4 line-clamp-3">{link.description}</p>

              {link.tags && link.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {link.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-[#4E81BD]/10 text-[#4E81BD] px-2 py-0.5 rounded-full text-xs"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                <div className="text-xs text-[#666666] flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(link.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}