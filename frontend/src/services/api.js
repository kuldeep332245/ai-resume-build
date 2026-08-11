import axios from 'axios';

const API = axios.create({
baseURL: 'https://ai-resume-backend-2024.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token add karo har request mein
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;