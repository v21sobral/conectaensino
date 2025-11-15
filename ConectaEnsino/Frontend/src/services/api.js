import axios from 'axios';

// URL base da sua API backend (ajuste a porta se for diferente)
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Exemplo: seu backend Express
});

// Interceptor opcional: adiciona token JWT em todas as requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
