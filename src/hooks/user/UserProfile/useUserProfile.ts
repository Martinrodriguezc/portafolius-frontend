import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { authService } from "../../auth/authServices"
import {
  UserProfileProps,
} from "../../../types/Props/UserProfileProps"
import { UseUserProfileReturn } from "../../../types/User"

export function useUserProfile(): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfileProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (): Promise<void> => {
    setLoading(true)
    try {
      const user = authService.getCurrentUser()
      if (!user) throw new Error("Sesión vencida")
      const { data } = await axios.get<UserProfileProps>(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        { headers: { Authorization: `Bearer ${authService.getToken()}` } }
      )
      setProfile(data)
      setError(null)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg ?? err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error inesperado")
      }
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const handler = () => load()
    window.addEventListener("userUpdated", handler)
    return () => window.removeEventListener("userUpdated", handler)
  }, [load])

  const updateProfile = async (
    upd: Partial<Omit<UserProfileProps, "id">>
  ): Promise<void> => {
    if (!profile) throw new Error("Sesión vencida")

    const { first_name, last_name, email } = upd
    await axios.put<UserProfileProps>(
      `${import.meta.env.VITE_API_URL}/users/${profile.id}`,
      { first_name, last_name, email },
      { headers: { Authorization: `Bearer ${authService.getToken()}` } }
    )

    window.dispatchEvent(new CustomEvent("userUpdated"))
  }

  return { profile, loading, error, updateProfile }
}