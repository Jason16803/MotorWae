// In development this is empty — Vite proxy handles /api/* → localhost:5000
// In production set VITE_API_URL to your Render API URL in Vercel's environment settings
export const API_BASE = import.meta.env.VITE_API_URL || ''
