// import React, { createContext, useContext, useState } from 'react';

// interface AuthContextProps {
//   user: any;
//   setUser: (user: any) => void;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);

//   const login = (token: string) => {
//     localStorage.setItem('token', token);
//     // Decode and set user from token if needed
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// /src/context/authContext.tsx
// import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
// import axios from 'axios';

// interface AuthContextType {
//   user: string | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// // Create the AuthContext with default undefined for TS checks
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   // On load, check local storage for existing token and user
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(storedUser);
//       setIsAuthenticated(true);
//     }
//   }, []);


// // Login function
// const login = async (email: string, password: string) => {
//   try {
//     const response = await axios.post('http://localhost:5000/auth', {
//       email,
//       password,
//     });
//     console.log(response.data); // Log response to debug the issue
//     const { token, user } = response.data;

//     if (!user || !token) {
//       throw new Error('Invalid response format');
//     }

//     localStorage.setItem('token', token);        // Store token in local storage
//     localStorage.setItem('user', user.email);    // Store user in local storage
//     setToken(token);                             // Update token in state
//     setUser(user.email);                         // Update user in state
//     setIsAuthenticated(true);                    // Mark user as authenticated
//   } catch (error) {
//     console.error('Login failed', error);
//     throw error;
//   }
// };






//   // Register function
//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth/register', {
//         name,
//         email,
//         password,
//       });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);        // Store token in local storage
//       localStorage.setItem('user', user.email);    // Store user in local storage
//       setToken(token);                             // Update token in state
//       setUser(user.email);                         // Update user in state
//       setIsAuthenticated(true);                    // Mark user as authenticated
//     } catch (error) {
//       console.error('Registration failed', error);
//       throw error;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');              // Remove token from local storage
//     localStorage.removeItem('user');               // Remove user from local storage
//     setToken(null);                                // Clear token in state
//     setUser(null);                                 // Clear user in state
//     setIsAuthenticated(false);                     // Mark user as unauthenticated
//   };

//   // Memoize the value object passed to the context provider
//   const authContextValue = useMemo(() => ({
//     user,
//     token,
//     login,
//     register,
//     logout,
//     isAuthenticated,
//   }), [user, token, isAuthenticated]);  // Dependencies: value will only change when these do

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// authContext.tsx

import { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load auth data from localStorage on app initialization
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    
    if (savedToken && savedUser && savedRole) {
      setToken(savedToken);
      setUser(savedUser);
      setRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []); // Only run once on component mount

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth', { email, password });
      const { token, user, role } = response.data;
      console.log(response.data);
      if (!user || !token || !role) {
        throw new Error('Invalid response format');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', user.email);
      localStorage.setItem('role', role);

      setToken(token);
      setUser(user.email);
      setRole(role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { name, email, password, role });
      const { token, user } = response.data;
      console.log(response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('user', user.email);
      localStorage.setItem('role', user.role);

      setToken(token);
      setUser(user.email);
      setRole(user.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    setUser(null);
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const authContextValue = useMemo(
    () => ({ user, token, role, login, register, logout, isAuthenticated }),
    [user, token, role, isAuthenticated]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};








  // Login function
  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/auth', {
  //       email,
  //       password,
  //     });
  //     const { token, user } = response.data;
  //     localStorage.setItem('token', token);        // Store token in local storage
  //     localStorage.setItem('user', user.email);    // Store user in local storage
  //     setToken(token);                             // Update token in state
  //     setUser(user.email);                         // Update user in state
  //     setIsAuthenticated(true);                    // Mark user as authenticated
  //   } catch (error) {
  //     console.error('Login failed', error);
  //     throw error;
  //   }
  // };






// // /src/context/authContext.tsx
// import { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios'; // Axios instance or basic axios
// // src/context/authContext.tsx

// interface AuthContextType {
//   user: string | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;  // Update to accept name as well
//   logout: () => void;
//   isAuthenticated: boolean;
// }


// // Create the AuthContext with default undefined for TS checks
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   // On load, check local storage for existing token and user
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(storedUser);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Login function
//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth', {
//         email,
//         password,
//       });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);        // Store token in local storage
//       localStorage.setItem('user', user.email);    // Store user in local storage
//       setToken(token);                             // Update token in state
//       setUser(user.email);                         // Update user in state
//       setIsAuthenticated(true);                    // Mark user as authenticated
//     } catch (error) {
//       console.error('Login failed', error);
//       throw error;
//     }
//   };

//   // Register function
// // /src/context/authContext.tsx

// // Modify the register function to accept the name parameter
// const register = async (name: string, email: string, password: string) => {
//   try {
//     const response = await axios.post('http://localhost:5000/auth/register', {
//       name,  // include name in the request body
//       email,
//       password,
//     });
//     const { token, user } = response.data;
//     localStorage.setItem('token', token);        // Store token in local storage
//     localStorage.setItem('user', user.email);    // Store user in local storage
//     setToken(token);                             // Update token in state
//     setUser(user.email);                         // Update user in state
//     setIsAuthenticated(true);                    // Mark user as authenticated
//   } catch (error) {
//     console.error('Registration failed', error);
//     throw error;
//   }
// };


//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');              // Remove token from local storage
//     localStorage.removeItem('user');               // Remove user from local storage
//     setToken(null);                                // Clear token in state
//     setUser(null);                                 // Clear user in state
//     setIsAuthenticated(false);                     // Mark user as unauthenticated
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



