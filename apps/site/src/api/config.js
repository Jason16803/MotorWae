// In development this is empty — Vite proxy handles /api/* → localhost:5000
// In production set VITE_API_URL to your Render API URL in Vercel's environment settings
export const API_BASE = import.meta.env.VITE_API_URL || ''

// Returns headers with Authorization token attached
export const authHeaders = () => {
  const token = localStorage.getItem('mw_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}
