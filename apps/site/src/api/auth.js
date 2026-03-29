import { API_BASE } from './config.js'

export const register = async ({ name, email, password }) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Registration failed')
  }
  return res.json()
}

export const login = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Login failed')
  }
  return res.json()
}

export const saveToken = (token) => localStorage.setItem('mw_token', token)
export const getToken = () => localStorage.getItem('mw_token')
export const removeToken = () => localStorage.removeItem('mw_token')
export const isLoggedIn = () => !!getToken()
