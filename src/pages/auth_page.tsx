import AuthTabs from '../components/auth/AuthTabs';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFB] p-4">
      <div className="w-full max-w-md">
        <AuthTabs />
      </div>
    </div>
  );
}
