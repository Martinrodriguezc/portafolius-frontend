import { ArrowLeft } from "lucide-react";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";

interface ReturnButtonProps {
  to?: string; 
}

export function ReturnButton({ to }: ReturnButtonProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return to ? (
    <Link to={to}>
      <Button variant="outline" className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>
    </Link>
  ) : (
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