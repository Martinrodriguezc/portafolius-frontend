import { authService } from '../../../hooks/auth/authServices';

export const PageHeader = () => {
  const currentUser = authService.getCurrentUser();
  const firstName = currentUser?.first_name || 'Administrador';

  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Buenos días, {firstName}
      </h1>
      <p className="text-gray-500">{capitalizedDate}</p>
    </div>
  );
}; 