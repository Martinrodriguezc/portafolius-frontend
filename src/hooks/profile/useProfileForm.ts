import { useState } from "react";
import { SaveProfileProps } from "../../types/Props/UserProfileProps";

export default function useProfileForm({ profile, onSave }: SaveProfileProps) {
  const [form, setForm] = useState(() => ({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
  }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await onSave(form);
      setSaved(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message ?? "Error al guardar");
      } else {
        setError("Error desconocido");
      }
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    error,
    saved,
    form,
    handleChange,
    handleSubmit,
  };
}
