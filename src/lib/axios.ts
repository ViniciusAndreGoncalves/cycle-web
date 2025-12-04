import axios from 'axios'

export const api = axios.create({
  // Endereço do Back-end Laravel
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  
  // Mudei para false. Ao usar o Bearer Token, não precisa de cookies na maioria dos casos.
  withCredentials: false, 
  
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})