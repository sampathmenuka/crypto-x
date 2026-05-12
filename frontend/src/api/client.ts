import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // matching backend port usually or vite proxy

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Optionally handle global errors (e.g., 401 unauthorized)
    return Promise.reject(error);
  }
);
