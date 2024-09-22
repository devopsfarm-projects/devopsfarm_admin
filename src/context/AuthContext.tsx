import React, { createContext, useState, useEffect,ReactNode   } from 'react';
import axios from '../api/api.ts'; // Correctly importing axios instance

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  accessToken: string;
  isAuthenticated: boolean;
  logout: () => void;
}

// Define the initial context with undefined for TypeScript checking
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  // Handle login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ accessToken: string; refreshToken: string }>('/login', {
        email,
        password,
      });
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setIsAuthenticated(true); // Mark the user as authenticated
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
      throw error; // Propagate the error for handling in the UI
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  // Handle registration
  const register = async (email: string, password: string) => {
    try {
      await axios.post('/register', { email, password });
    } catch (error) {
      console.error('Registration failed', error);
      throw error; // Propagate error to be handled in UI
    }
  };

  // Refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post<{ accessToken: string }>('/token', { refreshToken });
      setAccessToken(response.data.accessToken);
      localStorage.setItem('accessToken', response.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token refresh failed', error);
      setIsAuthenticated(false);
      throw error; // Propagate error to handle in UI
    }
  };

  // Automatically refresh token if the page reloads
  useEffect(() => {
    if (refreshToken) {
      refreshAccessToken().catch(() => setIsAuthenticated(false));
    }
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{ login, register, logout , refreshAccessToken, accessToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
