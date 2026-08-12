import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-resume-backend-2024.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // Render free plan sleep se jaagne mein time lagta hai, isliye 60 sec
});

// Token add karo har request mein
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Agar token invalid/expired hai, auto logout kar do
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;