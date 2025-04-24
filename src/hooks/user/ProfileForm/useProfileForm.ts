import { useState } from "react";
import { UseProfileFormReturn, UserProfile } from "../../../types/User";

export function useProfileForm(
  profile: UserProfile,
  onSave: (data: Partial<Omit<UserProfile, "id">>) => Promise<void>
): UseProfileFormReturn {
  const [form, setForm] = useState<Omit<UserProfile, "id">>({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    role: profile.role,
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await onSave(form);
      setSaved(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error al guardar");
      }
    } finally {
      setBusy(false);
    }
  };

  return { form, busy, saved, error, handleChange, handleSubmit };
}
