import axios from 'axios'
import { LoginFormData }  from '../types/login'
import { RegisterFormData } from '../types/register'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const TOKEN_KEY   = 'auth_token'
const USER_KEY    = 'user_data'

export const authService = {
  async login(credentials: LoginFormData) {
    const { data } = await axios.post(`${BACKEND_URL}/auth/login`, credentials)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      const userData = { ...data }
      delete userData.token
      delete userData.password
      localStorage.setItem(USER_KEY, JSON.stringify(userData.user))
    }
    return data
  },

  async register(userData: RegisterFormData) {
    const { data } = await axios.post(`${BACKEND_URL}/auth/register`, userData)
    return data
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getCurrentUser() {
    const str = localStorage.getItem(USER_KEY)
    return str ? JSON.parse(str) : null
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  initiateGoogleLogin() {
    window.location.href = `${BACKEND_URL}/auth/google`
  },

  async handleGoogleCallback(code: string) {
    const { data } = await axios.get(`${BACKEND_URL}/auth/google/callback?code=${code}`)
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    }
    return data
  },

  async updateUserRole(role: string) {
    const stored = this.getCurrentUser()
    if (!stored) throw new Error('Usuario no encontrado')
    const current = stored.user ?? stored

    const { data } = await axios.put(
      `${BACKEND_URL}/users/${current.id}`,
      { firstName: current.first_name, lastName: current.last_name, role: role.toLowerCase() },
      { headers: { Authorization: `Bearer ${this.getToken()}` } }
    )

    if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    return data
  },

  async updateUserProfile(data: { firstName?: string; lastName?: string; email?: string }) {
    const stored  = this.getCurrentUser()
    if (!stored) throw new Error('Sesión vencida')
    const current = stored.user ?? stored

    const resp = await axios.put(
      `${BACKEND_URL}/users/${current.id}`,
      data,
      { headers: { Authorization: `Bearer ${this.getToken()}` } }
    )

    localStorage.setItem(USER_KEY, JSON.stringify(resp.data.user))

    window.dispatchEvent(new CustomEvent('userUpdated', { detail: resp.data.user }))

    return resp.data.user
  },
}