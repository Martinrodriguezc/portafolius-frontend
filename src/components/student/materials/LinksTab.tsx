import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { ExternalLink } from "lucide-react";
import { LinksTabProps } from "../../../types/Props/Tabs/LinksTabProps";

export function LinksTab({ links }: LinksTabProps) {
  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Card key={link.id} className="rounded-[16px]">
          <div className="flex items-start">
            <div className="bg-[#4E81BD]/10 p-3 rounded-lg mr-4">
              <ExternalLink className="h-6 w-6 text-[#4E81BD]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-[#333]">
                {link.title}
              </h3>
              <p className="text-[14px] text-[#A0A0A0] mt-1">
                {link.description}
              </p>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="text-[#4E81BD] border-[#4E81BD] hover:bg-[#4E81BD]/10"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visitar Sitio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
