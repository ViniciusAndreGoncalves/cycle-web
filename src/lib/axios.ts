import axios from 'axios'

export const api = axios.create({
  // Endereço do Back-end Laravel
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  console.log("Interceptor - Token encontrado:", token); // <--- ADICIONE ISSO
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})