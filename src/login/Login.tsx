// import React, { useState } from 'react';
// import { useAuth } from '../context/authContext';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:5000/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       login(data.token);
//       // Redirect or do something on successful login
//     } else {
//       // Handle error
//       console.error('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="max-w-md mx-auto">
//       <div>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2"
//         />
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2"
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white p-2">
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;


import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext'; // Adjust the import path if necessary
import Logout from './LogoutButton';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login, isAuthenticated } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);  // Call login function from context
      navigate('/courses'); // Redirect after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return isAuthenticated ? (
    <p>You are logged in! <Logout /></p>
  ) : (
    <main>
      <div className="flex bg-slate-900 items-center h-screen px-2 sm:px-0">
        <form onSubmit={handleSubmit} className="bg-gray-100 w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md">
          <div className="px-4 m-4 text-center">
            <h2 className="text-xl font-bold">Login to your account</h2>
          </div>

          <div className="inputs p-4 w-full">
            <div className="grid grid-cols-1 max-w-md mx-auto">
              <div className="form-group gap-2">
                <label className="block my-2" htmlFor="username">Username:</label>
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block my-2" htmlFor="password">Password:</label>
                <div className="relative">
                  <input
                    className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-300"
                    aria-label="Show password"
                  >
                    {/* Password visibility toggle icon can be added here */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600" type="submit">
                Login
              </button>
              
              <Link  to={'/register'}>
              <button className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600" >
              
              Register
             </button> </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
