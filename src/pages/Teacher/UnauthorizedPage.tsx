import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";

export default function UnauthorizedTeacherPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Cuenta pendiente de aprobación
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Tu cuenta de profesor aún no ha sido autorizada por el administrador.
          </p>
          <p className="text-gray-600 mb-4">
            Una vez que tu cuenta sea aprobada, podrás acceder a todas las funcionalidades
            del sistema.
          </p>
          <p className="text-gray-600">
            Si tienes alguna pregunta, por favor contacta al administrador.
          </p>
        </div>
        <Button
          onClick={() => navigate("/home")}
          className="w-full"
          variant="primary"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
} 