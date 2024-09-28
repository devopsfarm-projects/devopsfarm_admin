// /src/api.ts
import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await api.post('/auth', { email, password });
//     return response.data;
//   } catch (error) {
//     console.error('Login failed', error);
//     throw error;
//   }
// };

const API_URL = 'http://localhost:5000';

// Authentication API
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth`, { email, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
  return response.data;
};

// Courses API
export const getCourses = async (token: string) => {
  const response = await axios.get(`${API_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createCourse = async (token: string, course: { title: string; description: string; duration: number }) => {
  const response = await axios.post(`${API_URL}/courses`, course, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete, Update Course similarly




// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/auth',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const refreshToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) return;
   
//     try {
//       const res = await api.post('/refresh-token', { refreshToken });
//       localStorage.setItem('accessToken', res.data.accessToken);
     
//     } catch (err) {
//       console.error(err);
//     }
//   };
  


// export default api;
