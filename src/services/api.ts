import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Make sure this matches your backend

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => api.get('/users');
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);
export const getCourses = () => api.get('/courses');
export const updateCourse = (id: string, data: any) => api.put(`/courses/${id}`, data);
