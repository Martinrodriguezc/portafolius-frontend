import {
  loginRequest,
  registerRequest,
  initiateGoogleLoginRequest,
  handleGoogleCallbackRequest,
  updateUserRoleRequest,
  updateUserProfileRequest,
  changePasswordRequest,
} from "./requests/authRequests"
import { LoginFormData } from "../../types/form/Login"
import { RegisterFormData } from "../../types/form/Register"
import { AuthResponse, UserProps } from "../../types/User"

const TOKEN_KEY = "auth_token"
const USER_KEY = "user_data"

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const { data } = await loginRequest(credentials)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    }
    return data
  },

  async register(userData: RegisterFormData): Promise<AuthResponse> {
    const { data } = await registerRequest(userData)
    return data
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getCurrentUser(): UserProps | null {
    const str = localStorage.getItem(USER_KEY)
    return str ? JSON.parse(str) : null
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  initiateGoogleLogin(): void {
    window.location.href = initiateGoogleLoginRequest()
  },

  async handleGoogleCallback(code: string): Promise<AuthResponse> {
    const { data } = await handleGoogleCallbackRequest(code)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    }
    return data
  },

  async updateUserRole(role: string): Promise<UserProps> {
    const user = this.getCurrentUser()
    if (!user) throw new Error("Usuario no encontrado")
    const token = this.getToken()!
    const { data: updatedUser } = await updateUserRoleRequest(
      user.id,
      {
        firstName: user.first_name,
        lastName: user.last_name,
        role: role.toLowerCase(),
      },
      token
    )
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    return updatedUser
  },

  async updateUserProfile(
    payload: { first_name?: string; last_name?: string; email?: string },
    userIdOverride?: string
  ): Promise<UserProps> {
    const id =
      userIdOverride ||
      this.getCurrentUser()?.id?.toString() ||
      undefined
    if (!id) throw new Error("Sesión vencida")
    const token = this.getToken()!
    const { data: updatedUser } = await updateUserProfileRequest(
      id,
      payload,
      token
    )
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    window.dispatchEvent(
      new CustomEvent("userUpdated", { detail: updatedUser })
    )
    return updatedUser
  },

  async changePassword(
    current_password: string,
    new_password: string
  ): Promise<string> {
    const user = this.getCurrentUser()
    if (!user) throw new Error("Sesión vencida")
    const token = this.getToken()!
    const { data } = await changePasswordRequest(
      user.id.toString(),
      { current_password, new_password },
      token
    )
    return data.msg
  },
}