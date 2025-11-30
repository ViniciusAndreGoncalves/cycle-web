import axios from 'axios'

export const api = axios.create({
  // Endereço do Back-end Laravel
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})