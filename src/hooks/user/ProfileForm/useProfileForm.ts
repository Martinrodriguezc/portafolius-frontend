import { useState, useEffect } from "react";
import { UseProfileFormReturn, UserProfile } from "../../../types/User";
import { authService } from "../../auth/authServices";

export function useProfileForm(
  profile: UserProfile,
  onSave: (data: Partial<Omit<UserProfile, "id">>) => Promise<void>
): UseProfileFormReturn {
  const [form, setForm] = useState<Omit<UserProfile, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    role: profile.role,
  });

  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = {
        ...prev,
        [name]: value
      };
      return newForm;
    });
  };

  const handleSubmit = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      const payload = {
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
      };

      await authService.updateUserProfile(payload);
      
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

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
      }));
    }
  }, []);

  return { form, busy, saved, error, handleChange, handleSubmit };
}
