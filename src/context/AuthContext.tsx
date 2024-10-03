// /src/context/authContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios'; // Axios instance or basic axios
// src/context/authContext.tsx

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;  // Update to accept name as well
  logout: () => void;
  isAuthenticated: boolean;
}


// Create the AuthContext with default undefined for TS checks
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // On load, check local storage for existing token and user
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth', {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);        // Store token in local storage
      localStorage.setItem('user', user.email);    // Store user in local storage
      setToken(token);                             // Update token in state
      setUser(user.email);                         // Update user in state
      setIsAuthenticated(true);                    // Mark user as authenticated
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  // Register function
// /src/context/authContext.tsx

// Modify the register function to accept the name parameter
const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/register', {
      name,  // include name in the request body
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);        // Store token in local storage
    localStorage.setItem('user', user.email);    // Store user in local storage
    setToken(token);                             // Update token in state
    setUser(user.email);                         // Update user in state
    setIsAuthenticated(true);                    // Mark user as authenticated
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};


  // Logout function
  const logout = () => {
    localStorage.removeItem('token');              // Remove token from local storage
    localStorage.removeItem('user');               // Remove user from local storage
    setToken(null);                                // Clear token in state
    setUser(null);                                 // Clear user in state
    setIsAuthenticated(false);                     // Mark user as unauthenticated
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};





// // /src/context/authContext.tsx
// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';
// import { login } from '../api/api.ts';

// interface AuthContextType {
//   user: string | null;
//   token: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   register: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // Initial check for token and user
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(storedUser);
//     }
//   }, []);

//   // Login function

// //  const loginUser = async (email: string, password: string) => {
// //     try {
// //       const data = await login(email, password);
// //       setUser(data.user);  // Set user in context
// //       localStorage.setItem('accessToken', data.accessToken);  // Store JWT
// //       return data;
// //     } catch (error) {
// //       console.error('Login failed', error);
// //       throw error;
// //     }
// //   };

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth', {
//         email,
//         password,
//       });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', user.email);
//       setToken(token);
//       setUser(user.username);
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   // Register function
//   const register = async (username: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth/register', {
//         username,
//         password,
//       });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', user.username);
//       setToken(token);
//       setUser(user.username);
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








// // import React, { createContext, useState, useEffect,ReactNode   } from 'react';
// // import axios from '../api/api.ts'; // Correctly importing axios instance

// // interface AuthContextType {
// //   login: (email: string, password: string) => Promise<void>;
// //   register: (email: string, password: string) => Promise<void>;
// //   refreshAccessToken: () => Promise<void>;
// //   accessToken: string;
// //   isAuthenticated: boolean;
// //   logout: () => void;
// // }

// // // Define the initial context with undefined for TypeScript checking
// // export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
// //   const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
// //   const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

// //   // Handle login function
// //   const login = async (email: string, password: string) => {
// //     try {
// //       const response = await axios.post<{ accessToken: string; refreshToken: string }>('/login', {
// //         email,
// //         password,
// //       });
// //       setAccessToken(response.data.accessToken);
// //       setRefreshToken(response.data.refreshToken);
// //       localStorage.setItem('accessToken', response.data.accessToken);
// //       localStorage.setItem('refreshToken', response.data.refreshToken);
// //       setIsAuthenticated(true); // Mark the user as authenticated
// //     } catch (error) {
// //       console.error('Login failed', error);
// //       setIsAuthenticated(false);
// //       throw error; // Propagate the error for handling in the UI
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('accessToken');
// //     setIsAuthenticated(false);
// //   };

// //   // Handle registration
// //   const register = async (email: string, password: string) => {
// //     try {
// //       await axios.post('/register', { email, password });
// //     } catch (error) {
// //       console.error('Registration failed', error);
// //       throw error; // Propagate error to be handled in UI
// //     }
// //   };

// //   // Refresh the access token
// //   const refreshAccessToken = async () => {
// //     try {
// //       const response = await axios.post<{ accessToken: string }>('/token', { refreshToken });
// //       setAccessToken(response.data.accessToken);
// //       localStorage.setItem('accessToken', response.data.accessToken);
// //       setIsAuthenticated(true);
// //     } catch (error) {
// //       console.error('Token refresh failed', error);
// //       setIsAuthenticated(false);
// //       throw error; // Propagate error to handle in UI
// //     }
// //   };

// //   // Automatically refresh token if the page reloads
// //   useEffect(() => {
// //     if (refreshToken) {
// //       refreshAccessToken().catch(() => setIsAuthenticated(false));
// //     }
// //   }, [refreshToken]);

// //   return (
// //     <AuthContext.Provider
// //       value={{ login, register, logout , refreshAccessToken, accessToken, isAuthenticated }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
