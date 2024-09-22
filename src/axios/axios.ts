import axios from "axios";

// Create a custom axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
  timeout: 10000, // Optional: You can set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance; // Default export for axios instance

// Example Axios call for registration
export const register = async (email: string, password: string) => {
  try {
    const response = await instance.post('/auth/register', { // Use instance here instead of axios
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Optional: rethrow to handle it at the calling side
  }
};
