import { ArrowLeft } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export function ReturnButton() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button
      variant="outline"
      onClick={handleBack}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Volver
    </Button>
  );
}
