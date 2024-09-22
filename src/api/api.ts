import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
  
    try {
      const res = await api.post('/refresh-token', { refreshToken });
      localStorage.setItem('accessToken', res.data.accessToken);
    } catch (err) {
      console.error(err);
    }
  };
  


export default api;
