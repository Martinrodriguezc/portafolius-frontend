import { useState, useEffect } from "react"
import axios from "axios"
import {
  UserProfile,
  ProfileFormValues,
  UseProfileFormReturn,
} from "../../../types/User"
import { authService } from "../../auth/authServices"

export function useProfileForm(
  profile: UserProfile,
  onSave: (u: Partial<Omit<UserProfile, "id">>) => Promise<void>
): UseProfileFormReturn {
  const [form, setForm] = useState<ProfileFormValues>({
    first_name: "",
    last_name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  })
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setForm({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      current_password: "",
      new_password: "",
      confirm_password: "",
    })
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (): Promise<void> => {
    setBusy(true)
    setError(null)
    setSaved(false)

    try {
      const wantsPasswordChange =
        form.current_password || form.new_password || form.confirm_password

      if (wantsPasswordChange) {
        if (
          !form.current_password ||
          !form.new_password ||
          !form.confirm_password
        ) {
          throw new Error("Para cambiar la contraseña, completa los tres campos.")
        }
        if (form.new_password !== form.confirm_password) {
          throw new Error("La nueva contraseña y su confirmación no coinciden.")
        }
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
            form.new_password
          )
        ) {
          throw new Error(
            "Contraseña: mínimo 8 caracteres, una mayúscula, un número y un símbolo."
          )
        }
        await authService.changePassword(form.current_password, form.new_password)
      }

      const profileChanged =
        form.first_name !== profile.first_name ||
        form.last_name !== profile.last_name ||
        form.email !== profile.email

      if (profileChanged) {
        await authService.updateUserProfile(
          {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
          },
          profile.id.toString()
        )
        await onSave({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
        })
      }

      if (!wantsPasswordChange && !profileChanged) {
        throw new Error("No hay cambios para guardar.")
      }

      setSaved(true)
      setForm(f => ({
        ...f,
        current_password: "",
        new_password: "",
        confirm_password: "",
      }))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg ?? err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error al guardar.")
      }
    } finally {
      setBusy(false)
    }
  }

  return { form, busy, saved, error, handleChange, handleSubmit }
}